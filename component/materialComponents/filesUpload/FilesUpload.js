import React, { useState, useEffect } from 'react'
import styles from '../../admin/CrudComponent/product/product.module.scss'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
//dnd
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable"

import Resizer from "react-image-file-resizer";
import ShowImages from './ShowImages';

const FilesUpload = ({ imagez, imagezDelete, editImages }) => {

  const [values, setValues] = useState({
    images: [],
    loading: false,
    reload: false,
  })
  const { images, loading, reload } = values

  useEffect(() => {
    setValues({ ...values, images: editImages })
    imagez(editImages)
  }, [editImages])

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (active.id !== over.id) {
      setValues((item) => {
        const activeIndex = item.images.indexOf(active.id)
        const overIndex = item.images.indexOf(over.id)
        let newArray = arrayMove(item.images, activeIndex, overIndex)
        imagez(newArray)
        return { ...values, images: newArray }
      })
    }
  }

  const imageRemove = (i) => {
    const imageFilter = images.filter((image, index) => (
      i !== index
    ))
    imagezDelete(i)
    setValues({ ...values, images: imageFilter })
  }

  // const showEditImages = () => {
  //   return <div className={`${styles.imagesContainer}`}>
  //     {editImages.map((image, i) => {
  //       return (
  //         <>
  //           <div key={i}
  //             className={`${styles.image} `}>
  //             <img src={image} className="img-fluid" />

  //             <div className={`${styles.cross}`}
  //               onClick={() => imageRemove(i)}
  //             >
  //               &#10006;
  //             </div>
  //           </div>
  //         </>
  //       )
  //     }
  //     )}
  //   </div>
  // }


  const handleFiles = (event) => {
    imagezDelete(images)
    const files = event.target.files
    files.length > 4 && toast.error("maximum choose images limit is 4")

    let uploaded = []
    if (files && files.length < 5) {
      for (let i = 0; i < files.length; i++) {
        setValues({ ...values, loading: true })
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          90,
          0,
          (uri) => {
            uploaded.push(uri)
            imagez(uploaded)
            setValues({ images: uploaded, loading: false })
          },
          "base64"
        )
      }
    }
  }

  const showLoading = () => {
    return loading ?
      <div className='SpinnerOverlays' style={{ marginTop: "-100px", zIndex: 2 }}>
        <div className="SpinnerContainers"></div>
      </div>
      : ''
  }

  return (
    <>
      <ToastContainer />
      {showLoading()}

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        {images && images.length > 0 &&
          <SortableContext
            items={images}
            strategy={horizontalListSortingStrategy}
          >
            <div className="d-flex">
              {images.map((image, i) =>
                <div className={`${styles.imageContainer}`} key={i}>
                  <ShowImages image={image} id={i} />

                  <div className={`${styles.cross}`}
                    onClick={() => imageRemove(i)}
                  >
                   &#10006;
                  </div>
                </div>
              )}
            </div>
          </SortableContext>
        }

      </DndContext>
      {/* { editImages && editImages.length > 0 ?
          showEditImages()
          : 
          showEditImages() 
         }  */}


      <div className="form-group mt-2" >
        <label className='btn btn-dark '>
          Choose Images
          <input
            type="file"
            multiple
            hidden
            accept="images/*"
            onChange={handleFiles}
          />
        </label>

      </div>
    </>
  )
}

export default FilesUpload