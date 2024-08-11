import * as React from 'react';
import { View, Text } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { useWindowDimensions } from 'react-native';

const WeekScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Tuần</Text>
  </View>
);

const MonthScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Tháng</Text>
  </View>
);

export default function TabViewExample() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'week', title: 'Tuần' },
    { key: 'month', title: 'Tháng' },
  ]);

  const renderScene = SceneMap({
    week: WeekScreen,
    month: MonthScreen,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={props => (
        <View style={{ flexDirection: 'row', backgroundColor: '#F0EEF1', borderRadius: 4 }}>
          {props.navigationState.routes.map((route, i) => {
            const isSelected = index === i;
            return (
              <View
                key={route.key}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 10,
                  backgroundColor: isSelected ? 'white' : '#F0EEF1',
                  borderRadius: 4,
                }}
              >
                <Text style={{ color: isSelected ? 'black' : '#7C7C7C', fontWeight: isSelected ? '700' : '400' }}>
                  {route.title}
                </Text>
              </View>
            );
          })}
        </View>
      )}
    />
  );
}
