function TableScan() {}

TableScan.sumColumn = function(table_id, column_name) {
	// If the form is incomplete do not do anything.
	if (table_id == "" || column_name == "") { return; }

	// Variable declaration
	var table = document.getElementById(table_id);
	var header_row = document.getElementById(table_id).firstElementChild.childNodes[0].getElementsByTagName("TD");
	var column_index = 0;


	// Find the column if it exists, set column_index accordingly.
	for ( i = 0 ; i < header_row.length ; i++ ) {
		if (header_row[i].innerText.toLowerCase() == column_name.toLowerCase()) {
			column_index = i+1;
		}
	}

	// Go through the rest of the lists to the column_index and sum the numeric values found.
	var column_sum = 0;
	remaining_rows = table.firstElementChild.getElementsByTagName("TR");

	for ( i = 1 ; i < remaining_rows.length ; i++ ) {
		
		var column_count = 0; // Tracks column # in each row.
		var row_cells = remaining_rows[i].getElementsByTagName("TD"); // Gets all <td>'s in row.
		
		// For the cells in this row, check if the column is
		// the one we're looking for.
		for ( j = 0 ; j < row_cells.length ; j++ ) {
			column_count ++;
			if (column_count == column_index ) {
				
				// When we find the correct column, add the numeric value if
				// the cell content is a number and is not blank. Otherwise
				// add zero.
				if ( isNaN(row_cells[j].innerText) == false && row_cells[j].innerText != "" ) {
					column_sum += parseFloat(row_cells[j].innerText);
				} else {
					column_sum += 0;
				}

			}
		}
	}

	// Check if the column_sum is an integer and round if not.
	if ( column_sum % 1 != 0 ) {
		column_sum = column_sum.toFixed(2);
	}

	// Update the document appropriately
	document.getElementById("column_xxx").innerHTML = column_name;
	document.getElementById("table_yyy").innerHTML = table_id;
	document.getElementById("sum_zzz").innerHTML = column_sum;
	
	// Prevent the event from continuing so the page keeps the updated values.
	event.preventDefault();
	event.stopPropagation();
	return false;
}

