import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import FastImage from "react-native-fast-image";

import styles from "./styles";
import { baseImageURL, removeData } from "../../utils/DataUtils";
import { API_KEY } from '@env';

const Home = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const navigation = useNavigation()

  const {t} = useTranslation()

const fetchMovies = async (page: number) => {
  if(!hasMore) return

  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`);
    const data = await response.json();

    if(data.results){
      setMovies((prevMovies) => [...prevMovies, ...data.results]);
      setPage(data.page)
      setHasMore(data.page < data.total_pages);
    }
  } catch (err) {
    setError(t("failedtoloadmovies"));
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchMovies(page);
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const emptyComponent = () => {
    return (
        <View style={styles.loaderContainer}>
            <Text>{t('nomoviesfound')}</Text>
        </View>
    )
  }

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator size="large" color="#0000ff" />;
  };

  const renderItem = ({ item }: { item: any }) => {
    return (
      <View style={styles.itemContainer}>
        <FastImage
          style={styles.image}
          source={{
            uri: `${baseImageURL}${item?.poster_path}`, 
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <Text style={styles.title}>{item.original_title}</Text>
      </View>
    );
  };

  const handleLogout = async() => {
    await removeData('isLoggedIn')

    navigation.replace('SignIn')
  }

  return (
    <View style={styles.container}>
       <View style={styles.logoutContainer}>
        <Button
          title={t('logout')}
          onPress={handleLogout}
          disabled={loading}
        />
       </View>
      <Text style={styles.header}>{t('movieslist')}</Text>
      {error ?  
        <Text>{error}</Text>
      : 
        <FlatList
            data={movies}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2} 
            contentContainerStyle={styles.listContainer}
            ListEmptyComponent={emptyComponent}
            onEndReached={() => fetchMovies(page + 1)} 
            onEndReachedThreshold={0.5} 
            ListFooterComponent={renderFooter} 
        />
      }
    </View>
  );
};



export default Home;
