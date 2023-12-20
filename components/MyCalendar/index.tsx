import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment)

interface MyEvent {
    title: string
    start: Date
    end: Date
}

interface MyCalendarProps {
    events: MyEvent[]
    onEventClick: (event: MyEvent) => void
}

const MyCalendar: React.FC<MyCalendarProps> = ({ events, onEventClick }) => {
    return (
        <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            defaultView="week"
            style={{ height: 550, width: '100%' }}
            onSelectEvent={(event) => onEventClick(event as MyEvent)}
        />
    )
}

export default MyCalendar
