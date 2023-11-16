/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  FlatList,
  StatusBar,
  StyleSheet,
  Image,
  Text,
  TextInput,
  useColorScheme,
  View,
  ImageBackground,
  Button,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import {IconButton} from 'react-native-paper';

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */
const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const Stack = createNativeStackNavigator();
const MyStack = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const headerOptions = {
    headerStyle: {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
      height: 80,
    },
    headerTintColor: '#5774B8',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 12,
      color: '#fff',,
    },
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={headerOptions}>
        <Stack.Screen
          name="Login"
          options={{headerTitle: '', headerShown: true}}
          component={Login}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTitle: 'Home',
          }}
        />
        <Stack.Screen
          name="Network"
          component={Network}
          //options={{ presentation: 'transparentModal' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App: () => Node = () => {
  return <MyStack />;
};

const Login = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const loginStyle = StyleSheet.create({
    bgImgStyle: {
      flex: 1,
      width: '100%',
      resizeMode: 'cover', // or 'stretch',
    },

    container: {
      width: '100%',
      marginVertical: '40%',
      padding: '5%',
      //backgroundColor: 'black'
    },

    title: {
      color: '#fff',
      fontSize: 25,
      fontWeight: 'bold',
      textAlign: 'center',
      margin: '5%',
    },

    addInput: {
      margin: 20,
      padding: 10,
      borderRadius: 20,
      borderWidth: 1,
      backgroundColor: 'white',
      fontSize: 12,
    },

    btnView: {
      flexDirection: 'row',
      width: '90%',
      padding: '5%',
      paddingHorizontal: '35%',
      margin: '5%',
      borderRadius: 20,
      borderWidth: 1,
      borderColor: '#5774B8',
      backgroundColor: '#232323',
    },,
  });
  const [text, setText] = React.useState(
    '0x2Ad72691c6dd2332d86BFA09993f6e5eA35cAb36',
  );
  const [next, setNext] = React.useState(false);

  if (next && text.length == 42) {
    console.log(text);
    navigation.navigate('Home', {name: text});
  }

  const LoginComp = () => {
    return (
      <SafeAreaView style={loginStyle.container}>
        <Text style={loginStyle.title}>zõrå ëTh ėxpløra</Text>
        <TextInput
          style={loginStyle.addInput}
          onChangeText={setText}
          value={text}
          placeholder="Search by Ethereum Address "
        />
        <View style={loginStyle.btnView}>
          <Button title="Explore" color="white" onPress={setNext} />
        </View>
      </SafeAreaView>
    );
  };

  return (
    <ImageBackground
      source={require('./assets/557d7e641ca4961aa0b014348e1b3255.jpg')}
      style={loginStyle.bgImgStyle}>
      <SafeAreaView style={loginStyle.container}>
        <Text style={loginStyle.title}>zõrå ëTh ėxpløra</Text>
        <TextInput
          style={loginStyle.addInput}
          onChangeText={setText}
          value={text}
          placeholder="Search by Ethereum Address "
        />
        <View style={loginStyle.btnView}>
          <Button title="Explore" color="white" onPress={setNext} />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const Home = ({navigation, route}) => {
  const address = route.params.name;
  const API_KEY =
    'JAJVnZocsCMgDYZzw28EnDbMRzeKZIEPc7Nfgvmqc1zZFfT4docmVxPYOgQnZ3Ie';
  const chainId = '0x1';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'X-API-Key': API_KEY,
    },
  };

  const [items, setItems] = React.useState([]);
  const [fetching, setFetching] = React.useState(true);
  const [nativeBal, setNativeBal] = React.useState(0);
  const [network, setNetwork] = React.useState(false);

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    //backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const homeStyles = StyleSheet.create({
    topSection: {
      width: '100%',
      padding: '5%',
      justifyContent: 'center',
    },
    topIcon: {
      width: 50,
      height: 50,
      borderRadius: 50,
      borderWidth: 1,
      borderColor: '#5774B8',
      margin: '3%',
      marginHorizontal: '43%',
    },
    ethBal: {
      color: '#fff',
      fontSize: 23,
      fontWeight: 'bold',
      textAlign: 'center',
      margin: '2%',
    },
    idContainer: {
      width: '35%',
      height: 30,
      margin: '3%',
      marginHorizontal: '32%',
      backgroundColor: '#5774B8',
      borderRadius: 20,
      borderWidth: 1,
      padding: 5,
      paddingVertical: 7,
    },
    idLabel: {
      color: '#fff',
      fontSize: 12,
      textAlign: 'center',
      fontWeight: '400',
    },

    contentSection: {
      backgroundColor: '#000',
      borderRadius: 30,
      width: '100%',
      height: '100%',
      //margin: 5,
      padding: 5,
    },
    contentHeader: {
      flexDirection: 'row',
      borderBottomColor: '#5774B8',
      borderWidth: 3,
      width: '50%',
      margin: 2,
      padding: '1%',
    },
    HeaderTitle: {
      color: '#fff',
      fontSize: 15,
      fontWeight: '700',
      textAlign: 'center',
      margin: 10,
    },
    asset: {
      flexDirection: 'row',
      borderBottomColor: '#5774B8',
      borderWidth: 0.3,
      width: '100%',
      margin: 2,
      //paddingBottom: 5,
      padding: '1%',
    },
    assetIcon: {
      height: 40,
      width: 40,
      margin: 5,
      borderRadius: 20,
      borderWidth: 2,
    },
    assetName: {
      color: '#fff',
      fontSize: 15,
      fontWeight: '500',
      textAlign: 'center',
      margin: 15,
    },,
  });
  const HeaderTitle = ({navigation}) => {
    return (
      <TouchableHighlight
        onPress={e => {
          setNetwork;
          alert(network);
        }}>
        <View style={headerRightStyle.networkView}>
          <Image
            source={require('./assets/pngaaa.com-1559476.png')}
            style={headerRightStyle.networkIcon}
          />
          <Text style={headerRightStyle.networkText}>Ethereum</Text>
        </View>
      </TouchableHighlight>
    );;
  };
  const headerRightStyle = StyleSheet.create({
    accountView: {
      borderRadius: 50,
      borderColor: '#5774B8',
      borderWidth: 2,
    },
    accountIcon: {
      width: 30,
      height: 30,
      borderRadius: 50,
      borderWidth: 2,
      borderColor: isDarkMode ? Colors.darker : Colors.lighter,
      margin: 'auto',
      //marginHorizontal: '43%',
    },
    networkView: {
      flexDirection: 'row',
      padding: '3%',
      //width: '50%',
      borderRadius: 20,
      borderColor: '#5774B8',
      borderWidth: 1,
    },
    networkIcon: {
      width: 20,
      height: 20,
      borderRadius: 50,
      margin: '3%',
    },
    networkText: {
      color: '#fff',
      margin: '5%',
      //fontWeight: 'bold',
      fontSize: 12,
      textAlign: 'center',

    },
  });
  const HeaderRight = () => {
    return (
      <TouchableHighlight
        onPress={e => {
          alert('Pressed');
        ;}}>
        <View style={headerRightStyle.accountView}>
          <Image
            source={require('./assets/canvas.png')}
            style={headerRightStyle.accountIcon}
          />
        </View>
      </TouchableHighlight>
    );;
  };

  const Asset = ({data}) => {
    let id = Math.floor(Math.random() * 2) + 1;
    const decimal = Math.pow(10, -1 * data.decimals);
    const tokenBal = data.balance * decimal;
    const sources = [
      require('./assets/avatar1.png'),
      require('./assets/avatar2.png'),
      require('./assets/avatar3.png'),
    ];
    const src = sources[id];

    return (
      <View style={homeStyles.asset}>
        <Image source={src} style={homeStyles.assetIcon} />
        <Text style={homeStyles.assetName}>
          {tokenBal} {data.symbol}
        </Text>
      </View>
    );
  };
  const getNativeBal = () => {
    const API_URL = `https://deep-index.moralis.io/api/v2/${address}/balance?chain=${chainId}`;
    const eth_url =
      'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd';

    fetch(API_URL, options)
      .then(response => response.json())
      .then(data => {
        let balance = data.balance * 10 ** -18;
        //console.log(balance);
        return balance;
      })
      .then(results => {
        setNativeBal(results);
      })
      .catch(error => {
        console.error(error);
      });
  };;
  const getTokens = () => {
    const API_URL = `https://deep-index.moralis.io/api/v2/${address}/erc20?chain=${chainId}`;

    fetch(API_URL, options)
      .then(response => response.json())
      .then(data => {
        return data;
      })
      .then(results => {
        setItems(results);
        setFetching(false);
      })
      .catch(error => {
        console.error(error);
      });
  };;

  React.useEffect(() => {
    getNativeBal();
    getTokens();

    navigation.setOptions({
      headerRight: props => <HeaderTitle {...props} />,
    });;
  }, [navigation]);

  const nBal = String(nativeBal).slice(0, 7);

  if (fetching) {
    return <Loading />;;
  }

  if (network) {
    //setNetwork;
    navigation.navigate('Network');
  }

  return (
    <ImageBackground
      source={require('./assets/hYEcz5.jpg')}
      style={styles.bgImgStyle}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <View style={homeStyles.topSection}>
          <Image
            source={require('./assets/zora.jpeg')}
            style={homeStyles.topIcon}
          />
          <Text style={homeStyles.ethBal}>{nBal} ETH</Text>
          <View style={homeStyles.idContainer}>
            <Text style={homeStyles.idLabel}>{address.slice(0, 15)}</Text>
          </View>
        </View>
        <View style={homeStyles.contentSection}>
          <View style={homeStyles.contentHeader}>
            <Text style={homeStyles.HeaderTitle}>ASSETS</Text>
          </View>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={items}
            renderItem={({item}) => <Asset data={item} />}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );;
};

const Loading = () => {
  const LoadStyle = StyleSheet.create({
    bgImgStyle: {
      flex: 1,
      width: '100%',
      resizeMode: 'cover', // or 'stretch',
    },
    container: {
      justifyContent: 'center',
      margin: '10%',
      marginVertical: '50%',
      marginHorizontal: '20%',
      borderRadius: 20,
      borderColor: '#fff',
      borderWidth: 2,
      backgroundColor: '#000',
      width: '60%',
      height: '30%',
    },
    info: {
      color: '#fff',
      fontSize: 15,
      margin: 10,
      marginTop: '30%',
      textAlign: 'center',
    },
    act: {
      margin: 20,
    },
  });

  const LoadComp = () => {
    <SafeAreaView style={LoadStyle.container}>
      <Text style={LoadStyle.info}>Fetching Account Info...</Text>
    </SafeAreaView>;
  };

  return (
    <ImageBackground
      source={require('./assets/557d7e641ca4961aa0b014348e1b3255.jpg')}
      style={LoadStyle.bgImgStyle}>
      <SafeAreaView style={LoadStyle.container}>
        <ActivityIndicator size="large" />
        <Text style={LoadStyle.info}>Fetching Account Info...</Text>
      </SafeAreaView>
    </ImageBackground>
  );;
};

const Network = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const netStyle = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'left',
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    },
    title: {
      color: 'white',
    },
  });

  return (
    <SafeAreaView style={netStyle.container}>
      <Text style={netStyle.title}>Networks</Text>
    </SafeAreaView>
  );;
};

const Welcome = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.js</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );;
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  bgImgStyle: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover', // or 'stretch',
  },
});

export default App;
