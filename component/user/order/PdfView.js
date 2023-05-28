import React from 'react'
import {PDFDownloadLink } from '@react-pdf/renderer'
import Invoice from './Invoice'

const PdfView = ({order}) => {
    return (
       <PDFDownloadLink
            document={<Invoice order={order} />}
            fileName="invoice.pdf"
            className='btn btn-sm btn-block btn-outline-dark'
        >
            Download PDF
        </PDFDownloadLink>
    )
}

export default PdfView