import React from 'react'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import {
    Table, TableHeader, TableCell, TableBody, DataTableCell
} from "@david.kucsai/react-pdf-table"

const Invoice = ({ order }) => {
    return (
        <Document>
            <Page style={styles.body}>
                <Text fixed style={styles.header}>
                    {new Date().toLocaleString()}
                </Text>
                <Text style={styles.title}>Order Invoice</Text>
                <Text style={styles.author}>MH MARKET</Text>
                <Text style={styles.subtitle}>Order Summary</Text>

                <Table>
                    <TableHeader>
                        <TableCell>Title</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Shipping</TableCell>
                    </TableHeader>
                </Table>

                <Table data={order.products}>
                    <TableBody>
                        <DataTableCell getContent={x =>
                            <Text style={styles.centerText}>
                                {x.product.title.substring(0, 30)}...
                            </Text>}
                        />
                        <DataTableCell getContent={x =>
                            <Text style={styles.centerText}>
                                `Rs {x.product.price}.00`
                            </Text>
                        } />
                        <DataTableCell getContent={x =>
                            <Text style={styles.centerText}>
                                {x.count}
                            </Text>
                        } />
                        <TableCell>
                            <Text style={styles.centerText}>
                                Rs 200.00
                            </Text>
                        </TableCell>
                    </TableBody>
                </Table>

                <Text style={styles.text}>
                    <Text>
                        Address: {order.userDetail.address} {"\n"}
                        phone:{order.userDetail.phone} {"\n"}
                        name:{order.userDetail.name}{"\n"}
                    </Text>
                    {"\n"}
                    <Text>
                        Date: {new Date(order.paymentIntent.created).toLocaleString()}
                    </Text>
                    {"\n"}
                    <Text>Order Id: {order.paymentIntent.id}</Text>
                    {"\n"}
                    <Text>Total Paid: {order.paymentIntent.amount}</Text>
                </Text>
            </Page>
        </Document>
    )
}

export default Invoice
const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    centerText: {
        textAlign: "center",
    },
    title: {
        fontSize: 24,
        textAlign: "center",
    },
    author: {
        fontSize: 12,
        textAlign: "center",
        marginBottom: 40,
    },
    subtitle: {
        fontSize: 18,
        margin: 12,
    },
    text: {
        margin: 12,
        fontSize: 14,
        textAlign: "justify",
    },
    image: {
        marginVertical: 15,
        marginHorizontal: 100,
    },
    header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: "center",
        color: "grey",
    },
    footer: {
        padding: "100px",
        fontSize: 12,
        marginBottom: 20,
        textAlign: "center",
        color: "grey",
    },
    pageNumber: {
        position: "absolute",
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: "center",
        color: "grey",
    },
});
