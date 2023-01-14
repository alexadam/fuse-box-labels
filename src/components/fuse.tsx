import React, { useEffect, useRef, useState } from "react";
import { IFuseData } from "./fuse-model";
import { CirclePicker, CompactPicker, SketchPicker } from 'react-color'

interface IFuseProps {
  fuseData: IFuseData
  asIcon?: boolean
  onUpdateFuseData?: (newData: IFuseData) => void
  onRemoveFuse?: (fuseId: number) => void
}

const Fuse = (props: IFuseProps) => {

  const [label, setLabel] = useState(props.fuseData.topLabel) // 
  const [isColorTooltipVisible, setIsColorTooltipVisible] = useState(false)
  const [isSwitcColorVisible, setIsSwitcColorVisible] = useState(false)
  const [tmpColor, setTmpColor] = useState('#000000')


  const onLabelColorChange = (e: any) => {
    const newValue = tmpColor
    const newData = { ...props.fuseData }
    newData.labelColor = newValue
    if (props.onUpdateFuseData) {
      props.onUpdateFuseData(newData)
    }
    setIsColorTooltipVisible(false)
  }

  const onSwitchColorChange = (e: any) => {
    const newValue = tmpColor
    const newData = { ...props.fuseData }
    newData.switchColor = newValue
    if (props.onUpdateFuseData) {
      props.onUpdateFuseData(newData)
    }
    setIsSwitcColorVisible(false)
  }

  useEffect(() => {
    const newData = { ...props.fuseData }
    newData.topLabel = label
    if (props.onUpdateFuseData) {
      props.onUpdateFuseData(newData)
    }
  }, [label])



  const simpleFuse = (
    <svg id={'svg-'+props.fuseData.id} viewBox=" 0 0 100 300">
      <defs>
        <filter id="f3" x="0" y="0" width="100%" height="200%">
          <feOffset result="offOut" in="SourceAlpha" dx="0" dy="0" />
          <feGaussianBlur result="blurOut" in="offOut" stdDeviation="10" />
          <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
        </filter>
      </defs>
      <g>
        <circle cx="50" cy="25" r="10" fill="rgba(0,0,0,0)" stroke="rgba(0,0,0,0.2)" strokeWidth={3} />
        <rect x="0" y="0" width="100" height="300" rx="0" fill="rgba(0,0,0,0.1)" stroke="black" strokeWidth={0} />
        <rect x="5" y="50" width="90" height="200" fill="white" filter="url(#f3)" />
        <rect style={{cursor: 'pointer',}} x="7" y="60" width="85" height="20" rx="5" fill={props.fuseData.labelColor || 'red'} onClick={() => setIsColorTooltipVisible(true)} />
        <rect style={{cursor: 'pointer',}} x="30" y="130" width="40" height="50" fill={props.fuseData.switchColor || 'black'} onClick={() => setIsSwitcColorVisible(true)} fillOpacity={0.4} rx={4} stroke="rgba(0,0,0,0.1)" strokeWidth={4} />
        <rect style={{cursor: 'pointer',}} x="20" y="160" width="60" height="20" fill={props.fuseData.switchColor || 'black'} onClick={() => setIsSwitcColorVisible(true)} fillOpacity={1} rx={4} />
        <circle cx="50" cy="275" r="10" fill="rgba(0,0,0,0)" stroke="rgba(0,0,0,0.2)" strokeWidth={3} />
      </g>
    </svg>
  )

  const doubleFuse = (
    <svg id={'svg-'+props.fuseData.id}  viewBox=" 0 0 200 300">
      <defs>
        <filter id="f3" x="0" y="0" width="100%" height="200%">
          <feOffset result="offOut" in="SourceAlpha" dx="0" dy="0" />
          <feGaussianBlur result="blurOut" in="offOut" stdDeviation="10" />
          <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
        </filter>
      </defs>
      <g>
        <circle cx="50" cy="25" r="10" fill="rgba(0,0,0,0)" stroke="rgba(0,0,0,0.2)" strokeWidth={3} />
        <rect x="0" y="0" width="100" height="300" rx="0" fill="rgba(0,0,0,0.1)" />
        <rect x="5" y="50" width="95" height="200" fill="white" filter="url(#f3)" />
        <rect style={{cursor: 'pointer',}} x="7" y="60" width="85" height="20" rx="5" fill={props.fuseData.labelColor || 'red'} onClick={() => setIsColorTooltipVisible(true)} />
        <rect style={{cursor: 'pointer',}} x="30" y="130" width="40" height="50" fill={props.fuseData.switchColor || 'black'} onClick={() => setIsSwitcColorVisible(true)} fillOpacity={0.4} rx={4} stroke="rgba(0,0,0,0.1)" strokeWidth={4} />
        <rect style={{cursor: 'pointer',}} x="20" y="160" width="80" height="20" fill={props.fuseData.switchColor || 'black'} onClick={() => setIsSwitcColorVisible(true)} fillOpacity={1} rx={4} />
        <circle cx="50" cy="275" r="10" fill="rgba(0,0,0,0)" stroke="rgba(0,0,0,0.2)" strokeWidth={3} />
      </g>
      <g transform="translate(100, 0)">
        <circle cx="50" cy="25" r="10" fill="rgba(0,0,0,0)" stroke="rgba(0,0,0,0.2)" strokeWidth={3} />
        <rect x="0" y="0" width="100" height="300" rx="0" fill="rgba(0,0,0,0.1)" stroke="black" strokeWidth={0} />
        <rect x="1" y="50" width="95" height="200" fill="white" filter="url(#f3)" />
        <rect style={{cursor: 'pointer',}} x="7" y="60" width="85" height="20" rx="5" fill={props.fuseData.labelColor || 'red'} onClick={() => setIsColorTooltipVisible(true)} />
        <rect style={{cursor: 'pointer',}} x="30" y="130" width="40" height="50" fill={props.fuseData.switchColor || 'black'} onClick={() => setIsSwitcColorVisible(true)} fillOpacity={0.4} rx={4} stroke="rgba(0,0,0,0.1)" strokeWidth={4} />
        <rect style={{cursor: 'pointer',}} x="0" y="160" width="80" height="20" fill={props.fuseData.switchColor || 'black'} onClick={() => setIsSwitcColorVisible(true)} fillOpacity={1} rx={4} />
        <circle cx="50" cy="275" r="10" fill="rgba(0,0,0,0)" stroke="rgba(0,0,0,0.2)" strokeWidth={3} />
      </g>
    </svg>
  )

  const tripleFuse = (
    <svg id={'svg-'+props.fuseData.id}  viewBox=" 0 0 300 300">
      <defs>
        <filter id="f3" x="0" y="0" width="100%" height="200%">
          <feOffset result="offOut" in="SourceAlpha" dx="0" dy="0" />
          <feGaussianBlur result="blurOut" in="offOut" stdDeviation="10" />
          <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
        </filter>
      </defs>
      <g>
        <circle cx="50" cy="25" r="10" fill="rgba(0,0,0,0)" stroke="rgba(0,0,0,0.2)" strokeWidth={3} />
        <rect x="0" y="0" width="100" height="300" rx="0" fill="rgba(0,0,0,0.1)" />
        <rect x="5" y="50" width="95" height="200" fill="white" filter="url(#f3)" />
        <rect style={{cursor: 'pointer',}} x="7" y="60" width="85" height="20" rx="5" fill={props.fuseData.labelColor || 'red'} onClick={() => setIsColorTooltipVisible(true)} />
        <rect style={{cursor: 'pointer',}} x="30" y="130" width="40" height="50" fill={props.fuseData.switchColor || 'black'} onClick={() => setIsSwitcColorVisible(true)} fillOpacity={0.4} rx={4} stroke="rgba(0,0,0,0.1)" strokeWidth={4} />
        <rect style={{cursor: 'pointer',}} x="20" y="160" width="80" height="20" fill={props.fuseData.switchColor || 'black'} onClick={() => setIsSwitcColorVisible(true)} fillOpacity={1} rx={4} />
        <circle cx="50" cy="275" r="10" fill="rgba(0,0,0,0)" stroke="rgba(0,0,0,0.2)" strokeWidth={3} />
      </g>
      <g transform="translate(100, 0)">
        <circle cx="50" cy="25" r="10" fill="rgba(0,0,0,0)" stroke="rgba(0,0,0,0.2)" strokeWidth={3} />
        <rect x="0" y="0" width="100" height="300" rx="0" fill="rgba(0,0,0,0.1)" stroke="black" strokeWidth={0} />
        <rect x="1" y="50" width="99" height="200" fill="white" filter="url(#f3)" />
        <rect style={{cursor: 'pointer',}} x="7" y="60" width="85" height="20" rx="5" fill={props.fuseData.labelColor || 'red'} onClick={() => setIsColorTooltipVisible(true)} />
        <rect style={{cursor: 'pointer',}} x="30" y="130" width="40" height="50" fill={props.fuseData.switchColor || 'black'} onClick={() => setIsSwitcColorVisible(true)} fillOpacity={0.4} rx={4} stroke="rgba(0,0,0,0.1)" strokeWidth={4} />
        <rect style={{cursor: 'pointer',}} x="0" y="160" width="100" height="20" fill={props.fuseData.switchColor || 'black'} onClick={() => setIsSwitcColorVisible(true)} fillOpacity={1} rx={4} />
        <circle cx="50" cy="275" r="10" fill="rgba(0,0,0,0)" stroke="rgba(0,0,0,0.2)" strokeWidth={3} />
      </g>
      <g transform="translate(200, 0)">
        <circle cx="50" cy="25" r="10" fill="rgba(0,0,0,0)" stroke="rgba(0,0,0,0.2)" strokeWidth={3} />
        <rect x="0" y="0" width="100" height="300" rx="0" fill="rgba(0,0,0,0.1)" stroke="black" strokeWidth={0} />
        <rect x="1" y="50" width="95" height="200" fill="white" filter="url(#f3)" />
        <rect style={{cursor: 'pointer',}} x="7" y="60" width="85" height="20" rx="5" fill={props.fuseData.labelColor || 'red'} onClick={() => setIsColorTooltipVisible(true)} />
        <rect style={{cursor: 'pointer',}} x="30" y="130" width="40" height="50" fill={props.fuseData.switchColor || 'black'} onClick={() => setIsSwitcColorVisible(true)} fillOpacity={0.4} rx={4} stroke="rgba(0,0,0,0.1)" strokeWidth={4} />
        <rect style={{cursor: 'pointer',}} x="0" y="160" width="80" height="20" fill={props.fuseData.switchColor || 'black'} onClick={() => setIsSwitcColorVisible(true)} fillOpacity={1} rx={4} />
        <circle cx="50" cy="275" r="10" fill="rgba(0,0,0,0)" stroke="rgba(0,0,0,0.2)" strokeWidth={3} />
      </g>
    </svg>
  )

  const doubleDis = (
    <svg id={'svg-'+props.fuseData.id}  viewBox=" 0 0 200 300">
      <defs>
        <filter id="f3" x="0" y="0" width="100%" height="200%">
          <feOffset result="offOut" in="SourceAlpha" dx="0" dy="0" />
          <feGaussianBlur result="blurOut" in="offOut" stdDeviation="10" />
          <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
        </filter>
      </defs>
      <g>
        <rect x="0" y="0" width="100" height="300" rx="0" fill="rgba(0,0,0,0.1)" />
        <rect x="5" y="50" width="95" height="200" fill="white" filter="url(#f3)" />
        <rect x="15" y="60" width="70" height="30" stroke="#000000" strokeWidth={2} fill="#fff" />
        <text x="40" y="85" color="#000" fontSize={30} fontFamily="sans-serif" fontWeight="bold" >T</text>
      </g>
      <g transform="translate(100, 0)">
        <circle cx="30" cy="25" r="10" fill="rgba(0,0,0,0)" stroke="rgba(0,0,0,0.2)" strokeWidth={3} />
        <circle cx="70" cy="25" r="10" fill="rgba(0,0,0,0)" stroke="rgba(0,0,0,0.2)" strokeWidth={3} />
        <rect x="0" y="0" width="100" height="300" rx="0" fill="rgba(0,0,0,0.1)" stroke="black" strokeWidth={0} />
        <rect x="1" y="50" width="95" height="200" fill="white" filter="url(#f3)" />
        <rect style={{cursor: 'pointer',}} x="7" y="60" width="85" height="20" rx="5" fill={props.fuseData.labelColor || 'red'} onClick={() => setIsColorTooltipVisible(true)} />
        <rect style={{cursor: 'pointer',}} x="30" y="130" width="40" height="50" fill={props.fuseData.switchColor || 'black'} onClick={() => setIsSwitcColorVisible(true)} fillOpacity={0.4} rx={4} stroke="rgba(0,0,0,0.1)" strokeWidth={4} />
        <rect style={{cursor: 'pointer',}} x="20" y="160" width="60" height="20" fill={props.fuseData.switchColor || 'black'} onClick={() => setIsSwitcColorVisible(true)} fillOpacity={1} rx={4} />
        <circle cx="30" cy="275" r="10" fill="rgba(0,0,0,0)" stroke="rgba(0,0,0,0.2)" strokeWidth={3} />
        <circle cx="70" cy="275" r="10" fill="rgba(0,0,0,0)" stroke="rgba(0,0,0,0.2)" strokeWidth={3} />
      </g>
    </svg>
  )

  const doubleVP = (
    <svg id={'svg-'+props.fuseData.id}  viewBox=" 0 0 200 300">
      <defs>
        <filter id="f3" x="0" y="0" width="100%" height="200%">
          <feOffset result="offOut" in="SourceAlpha" dx="0" dy="0" />
          <feGaussianBlur result="blurOut" in="offOut" stdDeviation="10" />
          <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
        </filter>
      </defs>
      <g>
        <circle cx="50" cy="25" r="10" fill="rgba(0,0,0,0)" stroke="rgba(0,0,0,0.2)" strokeWidth={3} />
        <rect x="0" y="0" width="200" height="300" rx="0" fill="rgba(0,0,0,0.1)" />
        <rect x="5" y="50" width="190" height="200" fill="white" filter="url(#f3)" />
        <rect x="20" y="90" width="160" height="80" rx="0" fill="rgba(100,0,0,0.21)" strokeWidth={3} stroke="rgba(0,0,0,0.2)" />
        <rect style={{cursor: 'pointer',}} x="20" y="60" width="160" height="20" rx="5" fill={props.fuseData.labelColor || 'red'} onClick={() => setIsColorTooltipVisible(true)} />
        <circle cx="50" cy="275" r="10" fill="rgba(0,0,0,0)" stroke="rgba(0,0,0,0.2)" strokeWidth={3} />
        <circle cx="50" cy="210" r="15" fill="rgba(0,0,0,0.3)" stroke="rgba(0,0,0,0.52)" strokeWidth={3} />
        <circle cx="100" cy="210" r="15" fill="rgba(0,0,0,0.3)" stroke="rgba(0,0,0,0.52)" strokeWidth={3} />
        <circle cx="150" cy="210" r="15" fill="rgba(0,0,0,0.3)" stroke="rgba(0,0,0,0.52)" strokeWidth={3} />

      </g>
      <g transform="translate(100, 0)">
        
        <circle cx="50" cy="25" r="10" fill="rgba(0,0,0,0)" stroke="rgba(0,0,0,0.2)" strokeWidth={3} />
        <circle cx="50" cy="275" r="10" fill="rgba(0,0,0,0)" stroke="rgba(0,0,0,0.2)" strokeWidth={3} />
      </g>
    </svg>
  )
    



  let fuseComponent = null
  let width = ''
  if (props.fuseData.type === 'single') {
    fuseComponent = simpleFuse
    width = props.asIcon ? 'auto' : '100px'
  } else if (props.fuseData.type === 'double') {
    fuseComponent = doubleFuse
    width = props.asIcon ? 'auto' : '200px'
  } else if (props.fuseData.type === "triple") {
    fuseComponent = tripleFuse
    width = props.asIcon ? 'auto' : '300px'
  } else if (props.fuseData.type === 'double-dis') {
    fuseComponent = doubleDis
    width = props.asIcon ? 'auto' : '200px'
  } else if (props.fuseData.type === 'double-vp') {
    fuseComponent = doubleVP
    width = props.asIcon ? 'auto' : '200px'
  }

  const removeButton = (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
      <button onClick={() => props.onRemoveFuse!(props.fuseData.id)}
        style={{
          width: '24px', height: '24px', backgroundColor: 'rgba(0,0,0,0)', outline: 'none',
          padding: 0, border: 0, cursor: 'pointer',
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d0021b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    </div>
  )

  const labelInput = (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'row', }}>
      <input type="text"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        style={{
          width: '100%',
          textAlign: 'center',
          border: 'none',
          outline: 'none',
          fontSize: '16px',
          fontWeight: 'bold',
          backgroundColor: 'yellow',
          borderRight: 'solid black 1px',
          borderLeft: 'solid black 1px',
        }} />
    </div>
  )

  return (
    <div id={'fuse-' + props.fuseData.id} style={{
      width: width,
      height: props.asIcon ? '100px' : '340px',
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>


      {props.onRemoveFuse && !props.asIcon ? removeButton : null}



      {fuseComponent}


      {isColorTooltipVisible && !props.asIcon ?
        <div style={{
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          top: '130px',
          position: 'absolute',
          backgroundColor: 'white',
          padding: '10px',
          border: 'solid 1px gray',
        }}>
          <CompactPicker color={tmpColor} onChange={(e) => setTmpColor(e.hex)} />
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: '10px',
            justifyContent: 'space-between',
          }}>
            <button onClick={() => setIsColorTooltipVisible(false)}>Cancel</button>
            <button onClick={onLabelColorChange}>Save</button>
          </div>
        </div>
        :
        null
      }

      {isSwitcColorVisible && !props.asIcon ?
        <div style={{
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          top: '200px',
          position: 'absolute',
          backgroundColor: 'white',
          padding: '10px',
          border: 'solid 1px gray',
        }}>
          <CompactPicker color={tmpColor} onChange={(e) => setTmpColor(e.hex)} />
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: '10px',
            justifyContent: 'space-between',
          }}>
            <button onClick={() => setIsSwitcColorVisible(false)}>Cancel</button>
            <button onClick={onSwitchColorChange}>Save</button>
          </div>
        </div>
        :
        null
      }


      {!props.asIcon ? labelInput : null}

    </div>

  )
}

export default Fuse