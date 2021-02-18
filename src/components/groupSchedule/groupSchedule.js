import React from 'react';
import ErrorMessage from '../errorMessage';
import './groupSchedule.css';
import left from './left.svg';
import right from './right.svg';



class GroupSchedule extends React.Component {
    constructor(props){
        super(props);
        this.onShiftWeekForw = this.onShiftWeekForw.bind(this);
        this.onShiftWeekBack = this.onShiftWeekBack.bind(this);
        this.onWeek = this.onWeek.bind(this);
        this.onDay = this.onDay.bind(this);
    }

    state = {
        curMonday: null,
        curSunday: null,
        curDay: null,
        error: false,
        isWeek: true,
    }

    curShift = 0;
    weeksAfterSep = 0;
    dayShift = 0;
    forwOrBack;
    mondayDate;

    componentDidCatch(){
        this.setState({
            error: true
        })
    }

    componentDidMount(){
        this.curShift = 0;
        this.setState({
            curDay: this.getDayDate(),
            curMonday: this.getCurBorder(1),
            curSunday: this.getCurBorder(6)
        })
        this.weeksAfterSep = this.getTimeRemaining();
    }

    //имитация базы данных пока нет настоящей
    allDays = [
        {
            id: 'пн',
            day: 'ПН',
            idNum: 1,
            subj: [{
                    subjectNameOdd: 'Учебная практика',
                    subjectNameEven: 'Учебная практика',
                    time: '11:40 - 13:05',
                    place: '',
                    cab: 'ДО'
                },
                {
                    subjectNameOdd: 'Информационные системы и технологии',
                    subjectNameEven: 'Информационные системы и технологии',
                    time: '13:45 - 15:10',
                    place: '',
                    cab: 'ДО'
                },
            ]
        },
        {
            id: 'вт',
            day: 'ВТ',
            idNum: 2,
            subj: [{
                    subjectNameOdd: 'Мультимедийные технологии (практика)',
                    subjectNameEven: 'Мультимедийные технологии (практика)',
                    time: '10:05 - 11:30',
                    place: '',
                    cab: 'ДО'
                },
                {
                    subjectNameOdd: 'Мультимедийные технологии (лекция)',
                    subjectNameEven: 'Мультимедийные технологии (лекция)',
                    time: '13:45 - 15:10',
                    place: '',
                    cab: 'ДО'
                },
                {
                    subjectNameOdd: 'Право (лекция)',
                    subjectNameEven: '',
                    time: '15:20 - 16:45',
                    place: '',
                    cab: 'ДО'
                },
                {
                    subjectNameOdd: 'Право (практика)',
                    subjectNameEven: '',
                    time: '16:55 - 18:20',
                    place: '',
                    cab: 'ДО'
                },
            ]
        },
        {
            id: 'ср',
            day: 'СР',
            idNum: 3,
            subj: [
                {
                    subjectNameOdd: 'Исследование операций и методы оптимизации (лекция)',
                    subjectNameEven: 'Исследование операций и методы оптимизации (лекция)',
                    time: '13:45 - 15:10',
                    place: 'Вознес',
                    cab: '323 каб.'
                },
                {
                    subjectNameOdd: 'Исследование операций и методы оптимизации (практика)',
                    subjectNameEven: 'Исследование операций и методы оптимизации (практика)',
                    time: '15:20 - 16:45',
                    place: 'Вознес',
                    cab: '329 каб.'
                },
            ]
        },
        {
            id: 'чт',
            day: 'ЧТ',
            idNum: 4,
            subj: [{
                    subjectNameOdd: 'Программирование (лекция)',
                    subjectNameEven: 'Прикладной дизайн (лекция)',
                    time: '11:40 - 13:05',
                    place: '',
                    cab: 'ДО'
                },
                {
                    subjectNameOdd: 'Программирование (практика)',
                    subjectNameEven: 'Программирование (практика)',
                    time: '13:45 - 15:10',
                    place: '',
                    cab: 'ДО'
                },
                {
                    subjectNameOdd: 'Физкультура',
                    subjectNameEven: 'Физкультура',
                    time: '15:20 - 16:45',
                    place: '',
                    cab: 'ДО'
                },
                {
                    subjectNameOdd: 'Английский язык (практика)',
                    subjectNameEven: 'Английский язык (практика)',
                    time: '16:55 - 18:20',
                    place: '',
                    cab: 'ДО'
                },
            ]
        },
        {
            id: 'пт',
            day: 'ПТ',
            idNum: 5,
            subj: [{
                    subjectNameOdd: 'Информационные системы и технологии (практика)',
                    subjectNameEven: 'Информационные системы и технологии (практика)',
                    time: '11:40 - 13:05',
                    place: 'Вознес',
                    cab: '459 каб.'
                },
                {
                    subjectNameOdd: 'Прикладной дизайн (практика)',
                    subjectNameEven: 'Прикладной дизайн (практика)',
                    time: '13:45 - 15:10',
                    place: 'Вознес',
                    cab: '462 каб.'
                },
                {
                    subjectNameOdd: 'Экономика (лекция)',
                    subjectNameEven: '',
                    time: '15:20 - 16:45',
                    place: 'Вознес',
                    cab: '381 каб.'
                },
                {
                    subjectNameOdd: 'Экономика (практика)',
                    subjectNameEven: '',
                    time: '16:55 - 18:20',
                    place: 'Вознес',
                    cab: '377 каб.'
                },
            ]
        },
        {
            id: 'сб',
            day: 'СБ',
            idNum: 6,
            subj: [{
                    subjectNameOdd: 'нет пар',
                    subjectNameEven: 'нет пар',
                    time: '',
                    place: '',
                    cab: ''
                }
            ]
        },
        {
            id: 'вс',
            day: 'ВС',
            idNum: 0,
            subj: [{
                    subjectNameOdd: 'нет пар',
                    subjectNameEven: 'нет пар',
                    time: '',
                    place: '',
                    cab: ''
                }
            ]
        }
    ]

    //считаю неделя четная или нет
    getTimeRemaining = () => {
        let t = Date.parse(this.mondayDate) - Date.parse(new Date(2020, 8, 1)),
            weeks = Math.floor((t/(1000*3600*24*7))) + 1;
        return (weeks);
        
    }

    //считаю дату понедельника и сб относительно текущей даты
    getCurBorder = (day) => {
        let date = new Date(),
            shift = this.curShift,
            monday = day,
            curWeekMonday,
            curMondayDate,
            curMonth = date.getMonth(),
            difference = date.getDay() - monday,
            curYear = date.getFullYear();

        if (difference === 0) {
            curWeekMonday = date;
        }

        curWeekMonday = date.getDate() - difference + shift*7;
        curMondayDate = new Date(curYear, curMonth, curWeekMonday);
        if (day === 1){
            this.mondayDate = curMondayDate;
        }
        return(curMondayDate.getDate() + '.' + (curMondayDate.getMonth() + 1))
    }

    //логика для перемещения по неделям в режиме по дням
    getDayDate = () => {
        let curDate = new Date(),
            curMonth = curDate.getMonth(),
            curDay = curDate.getDate() + this.dayShift,
            curYear = curDate.getFullYear(),
            newDate = new Date(curYear, curMonth, curDay);

        if (this.state.curSunday && this.state.curMonday){
            if ((newDate.getDay() === 0 && this.forwOrBack)){
                this.curShift += 1;
                this.setState({
                    curMonday: this.getCurBorder(1),
                    curSunday: this.getCurBorder(6)
                });
            } else if((newDate.getDay() === 1 && !this.forwOrBack)){
                this.curShift -= 1;
                this.setState({
                    curMonday: this.getCurBorder(1),
                    curSunday: this.getCurBorder(6)
                });
            }
            
        }

        return (newDate.getDate() + '.' + (newDate.getMonth()+1));
    }

    //логика для смены даты дня
    onDayForw = () => {        
        this.forwOrBack = true;
        this.dayShift+=1;
        this.setState({
            curDay: this.getDayDate()
        });
    }
    onDayBack = () => {
        this.forwOrBack = false;
        this.dayShift-=1;
        this.setState({
            curDay: this.getDayDate()
        });
    }

    //логика для смены режима промсотра
    onWeek = () => {
        this.setState(() => ({
            isWeek: true
        }));
    }

    onDay = () => {
        this.setState(() => ({
            isWeek: false
        }));
    }

    //логика для смены дат недели
    onShiftWeekForw = () => {
        this.curShift += 1;
        this.setState({
            curMonday: this.getCurBorder(1),
            curSunday: this.getCurBorder(6)
        });
    }
    onShiftWeekBack = () => {
        this.curShift -= 1;
        this.setState({
            curMonday: this.getCurBorder(1),
            curSunday: this.getCurBorder(6)
        });
    }

    renderItem = (arr) => {
        let curDate = new Date(),
            curDay = curDate.getDate() + this.dayShift,
            curMonth = curDate.getMonth(),
            curYear = curDate.getFullYear(),
            nowSched,
            nowDay = new Date(curYear, curMonth, curDay);

        nowSched = arr;
        if (!this.state.isWeek){nowSched=arr.filter((item) => item.idNum === nowDay.getDay())}

        return nowSched.map((item) => {
            let {day, subj} = item;
            let shiftAfterSep = this.curShift + this.weeksAfterSep;
            let whichWeek = shiftAfterSep % 2;
            return (
                <li key={getRandomId()}
                    className="day">
                    <div className="weekDay">{day}</div>
                    <div className='allDaySubjects'>
                        <RenderSubj subj={subj} whichWeek={whichWeek}/>
                    </div>
                </li>
            )
        })
    }

    render(){
        const {curMonday, curSunday, error, curDay, isWeek} = this.state; 
        const {curGroupId} = this.props;
        
        if (error) {
            return <ErrorMessage/>
        }

        let backFunc = isWeek ? this.onShiftWeekBack : this.onDayBack;
        let forwFunc = isWeek ? this.onShiftWeekForw : this.onDayForw;

        let dateContent = isWeek ? `${curMonday} - ${curSunday}` : curDay;
        let nextBtnContent = isWeek ? 'Следующая неделя' : 'Следующий день';
        let prevBtnContent = isWeek ? 'Предыдущая неделя' : 'Предыдущий день';
        let classForDay = isWeek ? 'dayWeek__switcher day_sitch active' : 'dayWeek__switcher day_sitch';
        let classForWeek = isWeek ? 'dayWeek__switcher'  : 'dayWeek__switcher active';

        const content = this.renderItem(this.allDays);
        this.getCurBorder();
        return(
            <div>
                <div className="group__number">Расписание для группы {curGroupId}</div>
                <div className="chooseWeek">
                    <div onClick={() => backFunc()} className="prevWeek">
                        <img src={left} alt="left" className='prev'></img>
                        <div className="prevWeek__text">{prevBtnContent}</div>
                    </div>
                    <div className="weekBounds">{dateContent}</div>
                    <div onClick={() => forwFunc()} className="nextWeek">
                        <div className="nextWeek__text">{nextBtnContent}</div>
                        <img src={right} alt="right" className='next'></img>
                    </div>
                </div>
                <div className="back__btn" onClick={() => {
                    this.props.onCurGroupId(null);
                    /* this.props.onCurDirectionId(null);
                    this.props.onCurInstituteId(null); */
                }}>Назад</div>
                <div className="view__switcher">
                    <div className={classForWeek} onClick={() => this.onWeek()}>По неделям</div>
                    <div className={classForDay} onClick={() => this.onDay()}>По дням</div>
                </div>
                <ul className='days__wrapper'>
                    {content}
                </ul>
            </div>
        )
    }
}


function getRandomId(max = 123, min = 97){
    let randId = '';
    for (let i = 0; i < 5; i++){
        let rand = Math.round((min - 0.5 + Math.random() * (max - min + 1)));
        randId += String.fromCharCode(rand);
    }
    return randId;
}

let RenderSubj = ({subj, whichWeek}) => {
        
    return subj.map((item) => {
        let {time, place, cab} = item;
        
        let subjectName = (whichWeek === 1) ? item.subjectNameOdd  : item.subjectNameEven ;
        let classNamez = 'oneSubj';
        if (subjectName === ''){
            time = place = cab =  '';
            classNamez = 'blankSubj'
        }
        return(
            <div key={getRandomId()} className={classNamez}>
                <div className='place__mini'>
                    <div className="building">{place}</div>
                    <div className="cab">{cab}</div>
                </div>

                <div className="time">{time}</div>
                <div className='place'>
                    <div className="building">{place}</div>
                    <div className="cab">{cab}</div>
                </div>
                <div className="subj">{subjectName}</div>
                <div className="time__mini">{time}</div>
            </div>
        )
    })
}

export default GroupSchedule;