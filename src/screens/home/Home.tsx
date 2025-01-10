import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, Button } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import FastImage from "react-native-fast-image";

import styles from "./styles";
import { baseImageURL, removeData } from "../../utils/DataUtils";
import { API_KEY } from '@env';
import { item } from "../../utils/types";

const Home = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const {t,i18n} = useTranslation()

  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>(i18n.language);
  const [items, setItems] = useState<item[]>([
          {label: 'English', value: 'en'},
          {label: 'Arabic', value: 'ar'},
      ]);

  const navigation = useNavigation()


const fetchMovies = async (page: number) => {
  if(!hasMore) return

  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}&language=${value}`);
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

  useEffect(() => {
    setMovies([]); 
    setPage(1); 
    setLoading(true); 
    setHasMore(true);
    fetchMovies(1); 
  }, [value]);

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
        <Text style={styles.title}>{item.title}</Text>
      </View>
    );
  };

  const handleLogout = async() => {
    await removeData('isLoggedIn')

    navigation.replace('SignIn')
  }

  const handleLanguageChange = (value: string) => {
    setValue(value);
    i18n.changeLanguage(value)
  };

  return (
    <View style={styles.container}>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          onChangeValue={(item) => handleLanguageChange(item)}
        />
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
