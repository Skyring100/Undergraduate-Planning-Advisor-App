import { View, Text } from 'react-native';
import BackButton from '../components/BackButton';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import PlannerTabs from '../components/Planner/TabBar';

export default function AddCourseScreen() {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <PlannerTabs/>
                <BackButton/>
                <Text>Add Course Screen</Text>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
        