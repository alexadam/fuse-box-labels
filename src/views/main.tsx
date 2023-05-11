import React, { useRef, useState } from 'react';
import { ReactSortable } from "react-sortablejs";
import { IFuseData } from '../components/fuse-model';
import Labels from '../components/labels';
import jsPDF from 'jspdf';
import { Canvg } from 'canvg';
import Fuse from '../components/fuse';

interface IMainProps {
}

const Main = (props: IMainProps) => {


  const defaultInfo = `Brand Name: 
Model: 
Current Rating: 
Voltage: 
Notes:

`

  const [state, setState] = useState<IFuseData[]>([
    { id: 1111, type: "single", topLabel: "Label", labelColor: '#ff0000', info: defaultInfo, },
    { id: 2222, type: "double", topLabel: "Label", labelColor: '#ff0000', info: defaultInfo, },
    { id: 3333, type: "triple", topLabel: "Label", labelColor: '#ff0000', info: defaultInfo, },
  ]);

  const onUpdateFuseData = (newData: IFuseData) => {
    const newState = [...state]
    for (const fuse of newState) {
      if (fuse.id === newData.id) {
        fuse.info = newData.info
        fuse.labelColor = newData.labelColor
        fuse.switchColor = newData.switchColor
        fuse.topLabel = newData.topLabel
      }
    }
    setState(newState)
  }

  const [title, setTitle] = useState('Title')
  const uploadFileButtonRef = useRef<any>(null)


  const [srcElems, setSrcElems] = useState<IFuseData[]>([
    { id: 11, type: "single", topLabel: "Label", labelColor: '#ff0000', info: defaultInfo, },
    { id: 22, type: "double", topLabel: "Label", labelColor: '#ff0000', info: defaultInfo, },
    { id: 33, type: "triple", topLabel: "Label", labelColor: '#ff0000', info: defaultInfo, },
    { id: 44, type: "double-dis", topLabel: "Label", labelColor: '#ff0000', info: defaultInfo, },
    { id: 55, type: "double-vp", topLabel: "Label", labelColor: '#ff0000', info: defaultInfo, },
  ])



  const onRemoveFuse = (fuseId: number) => {
    const newState = [...state]
    for (let i = 0; i < newState.length; i++) {
      const element = newState[i]
      if (element.id === fuseId) {
        newState.splice(i, 1)
        setState(newState)
        return
      }
    }
  }

  const onImport = (e: any) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (ev: any) => {
      const text = (ev.target.result)
      const jsonData = JSON.parse(text)
      setState(jsonData)
    };
    reader.readAsText(e.target.files[0])
  }

  const onExport = () => {
    const link = document.createElement('a');
    const textFileAsBlob = new Blob([JSON.stringify(state)], { type: 'text/plain;charset=utf-8' });

    link.setAttribute('href', window.URL.createObjectURL(textFileAsBlob));
    link.setAttribute('download', 'fuse-labels.json');
    link.click();
  }

  return (
    <div
      style={{ display: 'flex', flexDirection: "row", height: '100%', }}>
      <div style={{ width: "200px", height: '100%', paddingTop: 80,  }}>
        <ReactSortable
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%', height: '100%',
            alignItems: 'center',
           cursor: 'pointer',
          }}
          group={{ name: 'g1', pull: 'clone' }}
          list={srcElems} setList={setSrcElems}

          clone={(item: IFuseData) => {

            const newFuse = {
              ...item,
              id: Math.floor(Math.random() * 10000000),
            }

            return newFuse
          }} >
          {srcElems.map((item) => (
            <div key={item.id}
              style={{
                width: '100px',
                height: '100px',
                maxHeight: '100px',
                margin: '10px',
                // padding: '10px',
              }}>
              <div key={item.id}
                style={{
                  width: 'auto',
                  maxHeight: '100px',
                }}>
                <Fuse fuseData={item} asIcon={true} />
              </div>
            </div>


          ))}
        </ReactSortable>
      </div>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', minHeight: '400px' }}>

        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            paddingBottom: 0,
          }}
        >
          <input style={{
            width: '100%', fontSize: '24px', fontWeight: 'bold',
            border: 0, padding: 3, outline: 0, marginLeft: 40, 
          }} type="text" value={title} onChange={(e: any) => setTitle(e.target.value)} />


          <div
            onClick={() => uploadFileButtonRef.current?.click()}
            title="Load JSON"
          >
            <input style={{
              display: 'none', 
            }} ref={uploadFileButtonRef} type="file" onChange={onImport} /><svg style={{cursor: 'pointer',}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5" /></svg>
          </div>
          <button style={{
            outline: 0, backgroundColor: 'rgba(0,0,0,0)', border: 0, cursor: 'pointer',
          }}
            onClick={onExport}
            title="Save as JSON"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 8l-5-5-5 5M12 4.2v10.3" /></svg>
          </button>
          <button 
          style={{
            outline: 0, backgroundColor: 'rgba(0,0,0,0)', border: 0, cursor: 'pointer',
          }}
          onClick={async () => {
            const doc = new jsPDF({
              orientation: "landscape",
              unit: "cm",
            });

            doc.text(title, 1, 1);

            let xFactor = 1
            let index = 0

            for (const fuseData of state) {
              const elem = document.getElementById('fuse-' + fuseData.id)
              const bbox = elem!.getBoundingClientRect();
              if (index === 0) {
                xFactor = bbox.x
              }
              
              
              const svgAsText = new XMLSerializer().serializeToString(document.getElementById('svg-' + fuseData.id)!);


              const canvas = document.createElement('canvas');
              canvas.width = 100;
              canvas.height = 300;
              let svgWidth = 1.5

              if (fuseData.type === 'single') {
                canvas.width = 100;
                svgWidth = 1.5
              } else if (fuseData.type === 'double') {
                canvas.width = 200;
                svgWidth = 3
              } else if (fuseData.type === "triple") {
                canvas.width = 300;
                svgWidth = 4.5
              } else if (fuseData.type === 'double-dis') {
                canvas.width = 200;
                svgWidth = 3
              } else if (fuseData.type === 'double-vp') {
                canvas.width = 200;
                svgWidth = 3
              }

              const ctx = canvas.getContext('2d');

              const v = await Canvg.from(ctx!, svgAsText);
              v.start();
              const base64 = canvas.toDataURL("image/png");

              doc.addImage(base64, 'png', 1 + (bbox.x - xFactor) / 67, 3, svgWidth, 4.5)

              // INFO
              doc.setFont('sans serif');
              doc.setFontSize(8);
              doc.text(fuseData.info || '', (27 / state.length) * index + 1, 11)

              // INFO Label
              doc.setFont('', 'bold');
              doc.setFontSize(9);
              doc.text(fuseData.topLabel || '', (27 / state.length) * index + 1.5, 10.5)

              // LAbel colot
              doc.setFillColor(fuseData.labelColor!);
              doc.rect((27 / state.length) * index + 1, 10.2, 0.3, 0.3, "F");

              // fuse label
              doc.setFont("", 'bold');
              doc.setFontSize(9);
              doc.text(fuseData.topLabel || '', 1 + (bbox.x - xFactor) / 67 + 0.2, 8)

              index++
            }

            setTimeout(() => {
              doc.save("fuse-box-labels.pdf");
            }, 2000);

          }}>PDF</button>
        </div>

        <div style={{ width: "100%", minWidth: '100px' }}>
          <ReactSortable
            style={{ display: 'flex', 
                    flexDirection: "row", 
                    width: '95%', 
                    minHeight: '500px', 
                    minWidth: '100px', 
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.2)',
                    borderRadius: 10,
                    margin: 40,
                    marginTop: 20,
                    }}
            group={"g1"}
            list={state}
            setList={setState}
          >
            {state.map((item) => (
              <Fuse key={item.id} fuseData={item} onRemoveFuse={onRemoveFuse} onUpdateFuseData={onUpdateFuseData} />
            ))}
          </ReactSortable>
        </div>
        <div style={{ margin: '40px', marginTop: 20, width: '95%' }}>
          <Labels fuseList={state} onUpdateFuseData={onUpdateFuseData} />
        </div>
      </div>



    </div >
  )
}
export default Main

