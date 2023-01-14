import React, { useEffect, useState } from "react";
import { IFuseData } from "./fuse-model";

interface ILabelsProps {
  fuseList: IFuseData[],
  onUpdateFuseData: (newData: IFuseData) => void
}

const Labels = (props: ILabelsProps) => {

  return (
    <div style={{
      width: '100%', height: 'auto',
      display: 'flex', flexDirection: 'row', 
      // flexWrap: 'wrap'
    }}>

      {
        props.fuseList.map((fuse: IFuseData) => {          
          return (
            <div key={fuse.id} 
                style={{width: '100%', 
                        height: '300px',
                        border: 'solid 1px black', 
                        margin: '3px', 
                        boxSizing: 'border-box',
                        borderRadius: 5,
                        }}>
              <div style={{
                width: '100%', height: '50px', 
                borderBottom: 'solid 1px black',
                display: 'flex', flexDirection: 'row',
                justifyContent: 'center', alignItems: 'center'
                }}>

                <div style={{
                  width: '30px', height: '30px', backgroundColor: fuse.labelColor, marginRight: '10px',
                }}></div>

                <div style={{
                  fontSize: '20px', fontWeight: 'bold', fontFamily: 'sans-serif',
                }}>
                  {fuse.topLabel}
                </div>
              </div>
              <div style={{width: '100%', height: '250px',  boxSizing: 'border-box', padding: 3}}>
                <textarea style={{
                  width: '100%', height: "240px",
                  border: 0, outline: 0, resize: 'none', boxSizing: 'border-box',
                  fontSize: '16px', fontFamily: 'sans-serif',

                }}
                  value={fuse.info}
                  onChange={(e: any) => {
                    const newData = {...fuse}
                    newData.info = e.target.value
                    props.onUpdateFuseData(newData)
                  }}
                ></textarea>
              </div>
            </div>
          )
        })
      }
      
    </div>
  )
}

export default Labels