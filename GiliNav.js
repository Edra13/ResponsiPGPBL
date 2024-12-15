import * as React from 'react';
import { Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars, faClipboardCheck, faClipboardList, faComment, faEarthAsia, faGlobe, faMap } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { WebView } from 'react-native-webview';
import ListGili from './ListGili';
import GiliHome from './GiliHome';
import GiliEdit from './GiliEdit';

function HomeScreen() {
  return (
    <GiliHome/>
  );
}

function ListGiliScreen() {
  return (
    <ListGili />
  );
}

function GiliMapScreen() {
  return (
    <WebView
    source={{ uri: 'https://leaflet-map-kohl.vercel.app/home' }}
  />
  );
}

function GiliEditScreen() {
  return (
    <GiliEdit />
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = faHome;
            } else if (route.name === "Which Gili to Go?") {
              iconName = faClipboardList;
            } else if (route.name === "Comments") {
              iconName = faComment;
            } else if (route.name === "See Maps") {
              iconName = faEarthAsia;
            }

            return (
              <FontAwesomeIcon
                icon={iconName}
                size={20}
                color={focused ? "#0477bf" : "gray"}
              />
            );
          },
          tabBarActiveTintColor: "#0477bf",   // Teks aktif jadi hijau
          tabBarInactiveTintColor: "gray",    // Teks tidak aktif jadi abu-abu
          tabBarLabelStyle: {
            fontSize: 11,
          },
          headerShown: true,
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            tabBarLabel: "Home",
            headerTitle: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image 
                  source={require('./node_modules/react-native/Libraries/NewAppScreen/components/logoapp.png')} 
                  style={{ width: 40, height: 40, borderRadius: 20 }} // Gambar dalam bentuk lingkaran
                />
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 8, color: '#0477bf' }}>Home</Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Which Gili to Go?"
          component={ListGiliScreen}
          options={{
            tabBarLabel: "The Gili's",
            headerTitle: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image 
                  source={require('./node_modules/react-native/Libraries/NewAppScreen/components/logoapp.png')} 
                  style={{ width: 40, height: 40, borderRadius: 20 }} // Gambar dalam bentuk lingkaran
                />
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 8, color: '#0477bf' }}>The Gili's</Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Comments"
          component={GiliEditScreen}
          options={{
            tabBarLabel: "Comments",
            headerTitle: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image 
                  source={require('./node_modules/react-native/Libraries/NewAppScreen/components/logoapp.png')} 
                  style={{ width: 40, height: 40, borderRadius: 20 }} // Gambar dalam bentuk lingkaran
                />
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 8, color: '#0477bf' }}>Comments</Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="See Maps"
          component={GiliMapScreen}
          options={{
            tabBarLabel: "Maps",
            headerTitle: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image 
                  source={require('./node_modules/react-native/Libraries/NewAppScreen/components/logoapp.png')} 
                  style={{ width: 40, height: 40, borderRadius: 20 }} // Gambar dalam bentuk lingkaran
                />
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 8, color: '#0477bf' }}>Maps</Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
