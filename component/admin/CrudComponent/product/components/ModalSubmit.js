import React,{useState} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Link from 'next/link'


const ModalSubmit = ({clickFunction,title}) => {
    const [values, setValues] = useState({
        title: "",
        highlight: "",
        description: "",
        price: null,
        category: "",
        subcategory: {},
        images: [],
        shipping: "",
        color: "",
        brand: "",
    })
   
  return (
    <div className='shadow bg-dark text-white mt-5 rounded-3'>
                <ModalHeader className='bg-info'>
                    {title}
                    </ModalHeader>
                <ModalBody>
                   <p>click List to products page</p>
                   <p>click Dashboard to dashboard page</p>
                   <p>click add more to submit more product</p>
                </ModalBody>
                <ModalFooter>
                  <Link href="/admin/crud/product/list">
                    <Button color="light">
                       List
                    </Button>
                    </Link>
                    <Button color="light" onClick={()=>clickFunction(values)}>
                       add more
                    </Button>
                 <Link href="/admin">
                   <Button color="light">
                        Dashboard
                    </Button>
                 </Link>

                </ModalFooter>
            </div>
  )
}

export default ModalSubmit