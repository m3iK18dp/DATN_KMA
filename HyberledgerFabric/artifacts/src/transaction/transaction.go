package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"strconv"
	"time"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

type TransactionContract struct {
	contractapi.Contract
}

// var logger = flogging.MustGetLogger("transaction_cc")

type Transaction struct {
	ID         string    `json:"ID"`
	CreateTime time.Time `json:"CreateTime"`
	DataHash   string    `json:"DataHash"`
}

func (t *TransactionContract) AssetExists(
	ctx contractapi.TransactionContextInterface,
	assetId string) (bool, error) {
	exists, err := ctx.GetStub().GetState(assetId)
	if err != nil {
		return false, err
	}
	if exists == nil {
		return false, nil
	}
	return true, nil
}

func (t *TransactionContract) CreateTransaction(
	ctx contractapi.TransactionContextInterface,
	transactionId string,
	createTime time.Time,
	dataHash string) (string, error) {

	exists, err := t.AssetExists(ctx, transactionId)
	if err != nil {
		return "", fmt.Errorf("Failed to create transaction: %v", err)
	}
	if exists {
		return "", fmt.Errorf("Asset already exists: %s", transactionId)
	}
	transaction := &Transaction{
		ID:         transactionId,
		CreateTime: createTime,
		DataHash:   dataHash,
	}
	transactionBytes, err := json.Marshal(transaction)
	if err != nil {
		return "", fmt.Errorf("Failed to create transaction: %v", err)
	}
	err = ctx.GetStub().PutState(transactionId, transactionBytes)
	if err != nil {
		return "", fmt.Errorf("Failed to create transaction: %v", err)
	}

	// Registering the event
	// eventPayload := []byte(fmt.Sprintf("Asset with ID %s created", transactionId))
	eventPayload := transactionBytes
	err = ctx.GetStub().SetEvent("AddTransEvent", eventPayload)
	if err != nil {
		return "", fmt.Errorf("Failed to set event: %v", err)
	}
	return ctx.GetStub().GetTxID(), nil
}
func (t *TransactionContract) GetAllTransaction(
	ctx contractapi.TransactionContextInterface) ([]Transaction, error) {
	queryString := `{
						"selector": {
							"ID": {
								"$gt": null
							}
						}
					}`
	transactions, err := t.getQueryResultForQueryString(ctx, queryString)

	if err != nil {
		return nil, fmt.Errorf("Failed to get transactions by conditions %v", err)
	}
	return transactions, nil
}
func (t *TransactionContract) GetTransactionById(
	ctx contractapi.TransactionContextInterface,
	transactionId string,
	createTime time.Time) ([]Transaction, error) {
	if len(transactionId) == 0 || createTime.IsZero() {
		return nil, fmt.Errorf("Please provide correct transaction Id and create date")
	}
	queryString := fmt.Sprintf(`{
					"selector": {
						"ID": "%s",
						"CreateTime": "%s"
					}
				}`, transactionId, createTime.Format(time.RFC3339))
	transactions, err := t.GetTransactionForQuery(ctx, queryString)

	if err != nil {
		return nil, fmt.Errorf("Failed to get transaction %s: %v", transactionId, err)
	}
	if transactions == nil {
		return nil, fmt.Errorf("Transaction with id %s and create date %v does not exist", transactionId, createTime)
	}
	return transactions, nil
}

func (t *TransactionContract) UpdateTransactionById(
	ctx contractapi.TransactionContextInterface,
	transactionId string,
	createTime time.Time,
	dataHash string) (string, error) {

	if len(transactionId) == 0 || createTime.IsZero() || len(dataHash) == 0 {
		return "", fmt.Errorf("Please provide correct transaction Id, create date and data hash")
	}
	exists, err := t.AssetExists(ctx, transactionId)
	if err != nil {
		return "", err
	}
	if !exists {
		return "", fmt.Errorf("Transaction with id %s does not exist", transactionId)
	}
	transaction := &Transaction{
		ID:         transactionId,
		CreateTime: createTime,
		DataHash:   dataHash,
	}
	transactionJSON, err := json.Marshal(transaction)
	if err != nil {
		return "", err
	}
	err = ctx.GetStub().PutState(transactionId, transactionJSON)
	if err != nil {
		return "", err
	}

	// Registering the event
	// eventPayload := []byte(fmt.Sprintf("Asset with ID %s updated", transactionId))
	eventPayload := transactionJSON
	err = ctx.GetStub().SetEvent("UpdateTransEvent", eventPayload)
	if err != nil {
		return "", fmt.Errorf("Failed to set event: %v", err)
	}
	return ctx.GetStub().GetTxID(), nil
}
func (t *TransactionContract) GetHistoryForTransaction(
	ctx contractapi.TransactionContextInterface,
	transactionId string) (string, error) {
	resultsIterator, err := ctx.GetStub().GetHistoryForKey(transactionId)
	if err != nil {
		return "", fmt.Errorf(err.Error())
	}
	defer resultsIterator.Close()

	var buffer bytes.Buffer
	buffer.WriteString("[")

	bArrayMemberAlreadyWritten := false
	for resultsIterator.HasNext() {
		response, err := resultsIterator.Next()
		if err != nil {
			return "", fmt.Errorf(err.Error())
		}
		if bArrayMemberAlreadyWritten == true {
			buffer.WriteString(",")
		}
		buffer.WriteString("{\"TxId\":")
		buffer.WriteString("\"")
		buffer.WriteString(response.TxId)
		buffer.WriteString("\"")

		buffer.WriteString(", \"Value\":")
		if response.IsDelete {
			buffer.WriteString("null")
		} else {
			buffer.WriteString(string(response.Value))
		}
		buffer.WriteString(", \"Timestamp\":")
		buffer.WriteString("\"")
		buffer.WriteString(time.Unix(response.Timestamp.Seconds, int64(response.Timestamp.Nanos)).String())
		buffer.WriteString("\"")
		buffer.WriteString(", \"IsDelete\":")
		buffer.WriteString("\"")
		buffer.WriteString(strconv.FormatBool(response.IsDelete))
		buffer.WriteString("\"")
		buffer.WriteString("}")
		bArrayMemberAlreadyWritten = true
	}
	buffer.WriteString("]")
	return string(buffer.Bytes()), nil
}
func (t *TransactionContract) DeleteTransactionById(
	ctx contractapi.TransactionContextInterface,
	transactionId string) (string, error) {
	if len(transactionId) == 0 {
		return "", fmt.Errorf("Please provide correct contract Id")
	}
	// Registering the event
	// eventPayload := []byte(fmt.Sprintf("Asset with ID %s deleted", transactionId))
	eventPayload := []byte(transactionId)
	var err = ctx.GetStub().SetEvent("DeleteTransEvent", eventPayload)
	if err != nil {
		return "", fmt.Errorf("Failed to set event: %v", err)
	}
	return ctx.GetStub().GetTxID(), ctx.GetStub().DelState(transactionId)
}
func (t *TransactionContract) GetTransactionForQuery(
	ctx contractapi.TransactionContextInterface,
	queryString string) ([]Transaction, error) {

	queryResults, err := t.getQueryResultForQueryString(ctx, queryString)

	if err != nil {
		return nil, fmt.Errorf("Failed to read from ----world state. %s", err.Error())
	}

	return queryResults, nil

}
func (t *TransactionContract) getQueryResultForQueryString(
	ctx contractapi.TransactionContextInterface,
	queryString string) ([]Transaction, error) {

	resultsIterator, err := ctx.GetStub().GetQueryResult(queryString)
	if err != nil {
		return nil, err
	}
	defer resultsIterator.Close()

	results := []Transaction{}

	for resultsIterator.HasNext() {
		response, err := resultsIterator.Next()
		if err != nil {
			return nil, err
		}

		newCar := new(Transaction)

		err = json.Unmarshal(response.Value, newCar)
		if err != nil {
			return nil, err
		}

		results = append(results, *newCar)
	}
	return results, nil
}
func main() {

	chaincode, err := contractapi.NewChaincode(new(TransactionContract))
	if err != nil {
		fmt.Printf("Error create transaction chaincode: %s", err.Error())
		return
	}
	if err := chaincode.Start(); err != nil {
		fmt.Printf("Error starting chaincodes: %s", err.Error())
	}

}
