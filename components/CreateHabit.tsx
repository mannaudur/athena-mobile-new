import React,{useState} from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker'

const CreateHabit = ({handleCreate,goalNameId}:{ handleCreate:any, goalNameId: {id: number, name: string}[]}) => {

    const [newHabitName, setNewHabitName] = useState("");
    const [selectedGoal, setSelectedGoal] = useState(null);
    const [selectedScale, setSelectedScale] = useState(null);
    const [rangeStart, setRangeStart] = useState(0);
    const [rangeEnd, setRangeEnd] = useState(10);
    const [selectedLoop, setSelectedLoop] = useState(null);
    const [weekDays, setWeekDays] = useState([]);
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(new Date())

    const allDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const handleScaleChange = (itemValue:any) => {
        setSelectedScale(itemValue);
        }
    const handleLoopChange = (itemValue:any) => {
        setSelectedLoop(itemValue);
    };
    

  return (
    <View>

        {/* Input of new habit name */}
    <TextInput
      value={newHabitName}
      onChangeText={(text:any)=>setNewHabitName(text)}
      placeholder='Name new Habit'
    />
    <Text>Start Date:</Text>
    <DatePicker
        date={date}
        onDateChange={setDate}
        mode="date"
    />

    {/* Choose one of the existing goals */}
    <Picker
        selectedValue={selectedGoal}
        onValueChange={(itemValue) => setSelectedGoal(itemValue)}
    >
        <Picker.Item label="Select Goal" value={null} />
        {goalNameId.map((goal) => (
          <Picker.Item label={goal.name} value={goal.id} key={goal.id} />
        ))}
    </Picker>

    {/*Select one type of scale  */}
    <Picker
        selectedValue={selectedScale}
        onValueChange={(value) => handleScaleChange(value)}
      >
        <Picker.Item label="Select Scale" value={null} />
        <Picker.Item label="Boolean" value="boolean" />
        <Picker.Item label="Range" value="range" />
        <Picker.Item label="Numeric" value="numeric" />
    </Picker>
    {selectedScale === "range" && (
        <View>
          <Text>Range Start:</Text>
          <TextInput 
            value={String(rangeStart)}
            onChangeText={(text)=>setRangeStart(Number(text))}
            keyboardType="numeric"
          />

          <Text>Range End:</Text>
          <TextInput 
            value={String(rangeEnd)}
            onChangeText={(text)=>setRangeEnd(Number(text))}
            keyboardType="numeric"
          />
        </View>
    )}

    {/* Select type of loop */}
    <Picker
        selectedValue={selectedLoop}
        onValueChange={(value) => handleLoopChange(value)}
      >
        <Picker.Item label="Select Loop" value={null} />
        <Picker.Item label="Daily" value="daily" />
        <Picker.Item label="Routine" value="routine" />
    </Picker>
    {selectedLoop === "routine" && (
        <View>
            {allDays.map((day) => (
                <BouncyCheckbox
                text={day}
                onPress={(isChecked:boolean) => {
                    if (isChecked) {
                        setWeekDays([...weekDays, day]);
                    } else {
                        setWeekDays(weekDays.filter((d) => d !== day));
                    }
                }} key={day}
                />
            ))}

        </View>

    )}

    <TextInput
        value={description}
        onChangeText={(text)=>setDescription(text)}
        placeholder='Describe your habit'
    />

{/* need to create handleCreate function */}
    <Button title="Create" onPress={()=>handleCreate(newHabitName,selectedGoal,selectedScale,rangeStart,rangeEnd,selectedLoop,weekDays,description,date)}/>
  </View>
  );
};

export default CreateHabit;