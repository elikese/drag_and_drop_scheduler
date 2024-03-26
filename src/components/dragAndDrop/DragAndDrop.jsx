/** @jsxImportSource @emotion/react */
import { useRef, useState } from "react";
import * as s from "./style.js"

function DragAndDrop(props) {
    const [list, setList] = useState(new Array(28).fill(""));
    const [schedule, setSchedule] = useState({
        day:"",
        time:"",
        text:""
    })

    const dayArr = ["월","화","수","목","금","토","일"];
    const timeArr = ["09:00~11:00", "11:00~13:00", "14:00~16:00", "16:00~18:00"];

    const dragItem = useRef();
    const dragOverItem = useRef();

    const dargStart = (e, position) => {
        dragItem.current = position;
    }

    const dragEnter = (e, position) => {
        dragOverItem.current = position;
    }

    const drop = (e) => {
        const copyListItems = [...list];
        const dragItemContent = copyListItems[dragItem.current]
        copyListItems.splice(dragItem.current, 1);
        copyListItems.splice(dragOverItem.current, 0, dragItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        setList(() => copyListItems);
    }

    const handleAddClick = () => {
        
        const copyListItems = [...list];
        const content = schedule.text;
        const timeIndex = timeArr.indexOf(schedule.time);
        const dayIndex = dayArr.indexOf(schedule.day);
        const index = (timeIndex * 7) + dayIndex;
        if(copyListItems[index] !== "") {
            if(window.confirm("덮어쓰시겠습니까?")){
                copyListItems.splice(index, 1, content);
                setList(() => copyListItems);
            }
        }
        copyListItems.splice(index, 1, content);
        setList(() => copyListItems);
    }

    const handleScheduleClick = (e) => {
        const dayIndex = parseInt(e.target.id);
        const timeIndex = parseInt(e.target.className);
        setSchedule(prevSchedule => {
            return {
                ...prevSchedule,
                day: dayArr[dayIndex],
                time: timeArr[timeIndex]
            };
        });
        
    }

    return (
        <div css={s.layout}>
            <h1>Drag Scheduler</h1>
                <table css={s.table}>
                    <thead>
                        <th>시간</th>
                        <th>월</th>
                        <th>화</th>
                        <th>수</th>
                        <th>목</th>
                        <th>금</th>
                        <th>토</th>
                        <th>일</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>09:00~11:00</td>
                            {list && list.filter((item,dayIndex) => dayIndex < 7).map((item, dayIndex) => {
                                return(
                                    <td
                                        key={dayIndex}
                                        className="0"
                                        id={dayIndex}
                                        draggable
                                        onDragStart={(e) => dargStart(e, dayIndex)}
                                        onDragEnter={(e) => dragEnter(e, dayIndex)}
                                        onDragEnd={drop}
                                        onDragOver={(e) => e.preventDefault()}
                                        onClick={(e) => handleScheduleClick(e)}
                                    >
                                        {item}
                                    </td>
                                );
                            })}
                        </tr>
                        <tr>
                            <td>11:00~13:00</td>
                            {list && list.filter((item,dayIndex) => dayIndex > 6 && dayIndex < 14 ).map((item, dayIndex) => {
                                return(
                                    <td
                                        key={dayIndex}
                                        className="1"
                                        id={dayIndex}
                                        draggable
                                        onDragStart={(e) => dargStart(e, dayIndex + 7)}
                                        onDragEnter={(e) => dragEnter(e, dayIndex + 7)}
                                        onDragEnd={drop}
                                        onDragOver={(e) => e.preventDefault()}
                                        onClick={(e) => handleScheduleClick(e)}
                                    >
                                        {item}
                                    </td>
                                );
                            })}
                        </tr>
                        <tr>
                            <td>13:00~14:00</td>
                            <td colSpan={7}>점심식사(이곳에 스케쥴 드롭시 삭제)</td>
                        </tr>
                        <tr>
                            <td>14:00~16:00</td>
                            {list && list.filter((item,dayIndex) => dayIndex > 13 && dayIndex < 21 ).map((item, dayIndex) => {
                                return(
                                    <td
                                        key={dayIndex}
                                        className="2"
                                        id={dayIndex}
                                        draggable
                                        onDragStart={(e) => dargStart(e, dayIndex + 14)}
                                        onDragEnter={(e) => dragEnter(e, dayIndex + 14)}
                                        onDragEnd={drop}
                                        onDragOver={(e) => e.preventDefault()}
                                        onClick={(e) => handleScheduleClick(e)}
                                    >
                                        {item}
                                    </td>
                                );
                            })}
                        </tr>
                        <tr>
                            <td>16:00-18:00</td>
                            {list && list.filter((item,dayIndex) => dayIndex > 20 && dayIndex < 28 ).map((item, dayIndex) => {
                                return(
                                    <td
                                        key={dayIndex}
                                        className="3"
                                        id={dayIndex}
                                        draggable
                                        onDragStart={(e) => dargStart(e, dayIndex + 21)}
                                        onDragEnter={(e) => dragEnter(e, dayIndex + 21)}
                                        onDragEnd={drop}
                                        onDragOver={(e) => e.preventDefault()}
                                        onClick={(e) => handleScheduleClick(e)}
                                    >
                                        {item}
                                    </td>
                                );
                            })}
                        </tr>
                    </tbody>
                </table>
                <div css={s.inputBox}>
                    <select 
                        css={s.select}
                        value={schedule.day}
                        onChange={(e) => setSchedule({...schedule, day:e.target.value})}
                    >
                        {dayArr.map(day => <option>{day}</option>)}
                    </select>
                    <select
                        css={s.select}
                        value={schedule.time}
                        onChange={(e) => setSchedule({...schedule, time:e.target.value})}
                    >
                        {timeArr.map(time => <option>{time}</option>)}
                    </select>
                    <input 
                        type="text" 
                        css={s.inputText}
                        placeholder="할일"
                        value={schedule.text}
                        onChange={(e) => setSchedule({...schedule, text:e.target.value})}
                    />
                    
                    <button onClick={handleAddClick} css={s.button}>할일추가</button>
            </div>
        </div>

    );
}

export default DragAndDrop;