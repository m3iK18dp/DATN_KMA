package kma.datn.Listener.models;

import com.github.shyiko.mysql.binlog.event.EventData;
import lombok.Getter;

import java.io.Serializable;
import java.util.Arrays;
import java.util.BitSet;
import java.util.Iterator;
import java.util.List;


@Getter
public class WriteRowsData implements EventData {
    private long tableId;
    private BitSet includedColumns;
    private List<Serializable[]> rows;

    public WriteRowsData() {
    }

    public void setTableId(long tableId) {
        this.tableId = tableId;
    }

    public void setIncludedColumns(BitSet includedColumns) {
        this.includedColumns = includedColumns;
    }

    public void setRows(List<Serializable[]> rows) {
        this.rows = rows;
    }

    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("WriteRowsEventData");
        sb.append("{tableId=").append(this.tableId);
        sb.append(", includedColumns=").append(this.includedColumns);
        sb.append(", rows=[");
        Iterator var2 = this.rows.iterator();

        while (var2.hasNext()) {
            Object[] row = (Object[]) var2.next();
            System.out.println(Arrays.toString(row));
            sb.append("\n    ").append(Arrays.toString(row)).append(",");
        }

        if (!this.rows.isEmpty()) {
            sb.replace(sb.length() - 1, sb.length(), "\n");
        }

        sb.append("]}");
        return sb.toString();
    }
}
