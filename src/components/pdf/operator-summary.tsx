import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { WorkOrderSummaryOperator } from "@/lib/entities/models/work-order.model";
import { format } from "date-fns";

// Definisi style untuk PDF
const styles = StyleSheet.create({
    page: { padding: 20, fontSize: 12 },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
    },
    table: {
        // display: "table",
        width: "100%",
        borderStyle: "solid",
        borderWidth: 1,
    },
    tableRow: { flexDirection: "row" },
    tableCellHeader: {
        padding: 5,
        borderBottom: 1,
        fontWeight: "bold",
        flex: 1,
        textAlign: "center",
    },
    tableCell: { padding: 5, borderBottom: 1, flex: 1, textAlign: "center" },
    watermark: {
        fontSize: 10,
    },
});

// Komponen PDF
interface WorkOrderSummaryPdfProps {
    data: WorkOrderSummaryOperator[];
}

export const OperatorSummaryDocument: React.FC<WorkOrderSummaryPdfProps> = ({
    data,
}) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Text style={styles.title}>Work Order Operator Summary</Text>

                {/* Tabel Header */}
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCellHeader}>
                            Operator Name
                        </Text>
                        <Text style={styles.tableCellHeader}>Product Name</Text>
                        <Text style={styles.tableCellHeader}>
                            Complete Quantity
                        </Text>
                    </View>

                    {/* Render Data */}
                    {data.map((item, index) => (
                        <View key={index} style={styles.tableRow}>
                            <Text style={styles.tableCell}>
                                {item.operator_name}
                            </Text>
                            <Text style={styles.tableCell}>
                                {item.product_name}
                            </Text>
                            <Text style={styles.tableCell}>
                                {item.completed_quantity}
                            </Text>
                        </View>
                    ))}
                </View>
                <Text style={styles.watermark}>
                    Generated at:{" "}
                    {format(new Date(), "EEEE, dd MMMM yyyy HH:mm")}
                </Text>
            </Page>
        </Document>
    );
};
