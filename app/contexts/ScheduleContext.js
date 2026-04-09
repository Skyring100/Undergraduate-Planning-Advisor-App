import { createContext, useEffect, useState, useContext, use} from 'react';
import { AppState } from 'react-native';
import { getSectionsOnDayOfWeek } from '../services/sectionService';

const ScheduleContext = createContext();
const days = ['Y', 'M', 'T', 'W', 'R', 'F', 'S'];

function getTodayDayOfWeek() {
    const date = new Date();
    const dayIndex = date.getDay();
    return days[dayIndex];
}

export const ScheduleProvider = ({ children }) => {
    const [schedule, setSchedule] = useState([]);
    const [loading, setLoading] = useState(true);
    const [today, setToday] = useState(new Date().toDateString());

    useEffect(() => {
        const dayChange = AppState.addEventListener('change', (nextAppState) => {
        if (nextAppState === 'active') {
            const currentDate = new Date().toDateString();
            if (currentDate !== today) {
            setToday(currentDate);
            // Fetch new schedule data here and update the state
            }
        }
        });

        return () => dayChange.remove();
    }, [today]);


    useEffect(() => {
        fetchSchedule();
    }, [today]);

    const fetchSchedule = async () => {
        const todayDayOfWeek = getTodayDayOfWeek();
        if (todayDayOfWeek === 'Y') {
            setSchedule([]);
            setLoading(false);
            return;
        }
        try {
            setLoading(true);
            const classData = await getSectionsOnDayOfWeek(todayDayOfWeek);
            if (classData?.data){
                const classes = classData.data.filter(row => row.days_of_week.includes(todayDayOfWeek));
                classes.sort((a, b) => a.start_time.localeCompare(b.start_time));
                setSchedule(classes);
            }
        } catch (e) {
            console.error("Error fetching schedule: ", e);
        } finally {
            setLoading(false);
        }
    };

    const fetchByDay = async(todayDayOfWeek) => {
        if (todayDayOfWeek === 'Y') return [];
        try {
            const classData = await getSectionsOnDayOfWeek(todayDayOfWeek);
            if (classData?.data){
                const classes = classData.data.filter(row => row.days_of_week.includes(todayDayOfWeek));
                classes.sort((a, b) => a.start_time.localeCompare(b.start_time));
                return classes;
            }
        } catch (e) {
            console.error("Error fetching schedule: ", e);
        } 
        return [];
    };

    const [refreshToken, setRefreshToken] = useState(0);

    const invalidateCache = () => {setRefreshToken(t => t+1)};

    return (
        <ScheduleContext.Provider value={{ schedule, loading, fetchByDay, refetch: fetchSchedule, invalidateCache, refreshToken }}>
            {children}
        </ScheduleContext.Provider>
    );
}

export const useSchedule = () => useContext(ScheduleContext);
