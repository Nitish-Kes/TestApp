import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      padding: 10,
    },
    listContainer: {
      paddingBottom: 20,
    },
    itemContainer: {
      flex: 1,
      margin: 5,
      alignItems: "center",
    },
    image: {
      width: Dimensions.get("window").width / 2 - 20, // 2 columns
      height: 250,
      borderRadius: 10,
    },
    title: {
      marginTop: 5,
      fontSize: 14,
      textAlign: "center",
      fontWeight: "bold",
    },
    loaderContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    errorContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    header: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: "center",
        marginTop: '5%',
        marginBottom: '10%'
      },
    logoutContainer: {
        alignSelf: 'flex-end', 
        width: '30%',
    },
  });

export default styles;