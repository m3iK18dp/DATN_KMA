package kma.datn.Listener.models;

import com.github.shyiko.mysql.binlog.event.EventData;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UpdateRowsData implements EventData {
    private long tableId;
    private BitSet includedColumnsBeforeUpdate;
    private BitSet includedColumns;
    private List<Map.Entry<Serializable[], Serializable[]>> rows;
    
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("UpdateRowsEventData");
        sb.append("{tableId=").append(this.tableId);
        sb.append(", includedColumnsBeforeUpdate=").append(this.includedColumnsBeforeUpdate);
        sb.append(", includedColumns=").append(this.includedColumns);
        sb.append(", rows=[");
        Iterator var2 = this.rows.iterator();

        while (var2.hasNext()) {
            Map.Entry<Serializable[], Serializable[]> row = (Map.Entry) var2.next();
            sb.append("\n    ").append("{before=").append(Arrays.toString(row.getKey())).append(", after=").append(Arrays.toString(row.getValue())).append("},");
        }

        if (!this.rows.isEmpty()) {
            sb.replace(sb.length() - 1, sb.length(), "\n");
        }

        sb.append("]}");
        return sb.toString();
    }
}
