import React, { FC, useState } from "react";
import {TextInput, Button, Text, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";
import { useDispatch, useSelector } from "react-redux";

import styles from "./styles";
import { AppDispatch, RootState} from "../../store";
import { resetForm, setEmail, setPassword } from "../../store/formSlice";
import { isValidEmail, isValidPassword, saveData } from "../../utils/DataUtils";
import { useTranslation } from "react-i18next";
import { item } from "../../utils/types";

const SignIn: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { email, password } = useSelector((state: RootState) => state.form);
  const navigation = useNavigation()

    const [open, setOpen] = useState<boolean>(false);
    const [value, setValue] = useState<string>('en');
    const [items, setItems] = useState<item[]>([
        {label: 'English', value: 'en'},
        {label: 'Arabic', value: 'ar'},
    ]);

  const {t,i18n} = useTranslation()

  const isFormValid = isValidEmail(email) && isValidPassword(password);

  const handleSubmit = async() => {
    if (isFormValid) {
      console.log({email,password})
      dispatch(resetForm());
      await saveData('isLoggedIn',true)
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }], 
      });
    }
  };

  const handleLanguageChange = (value: string) => {
    setValue(value);
    i18n.changeLanguage(value)
  };

  return (
        <ScrollView 
          style={styles.container} 
          keyboardShouldPersistTaps="handled"
        > 
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              onChangeValue={(item) => handleLanguageChange(item)}
          />
          <Text style={styles.header}>{t('loginform')}</Text>
          <TextInput
            style={styles.input}
            placeholder={t('email')}
            keyboardType="email-address"
            onChangeText={(text) => dispatch(setEmail(text))}
            value={email}
          />
          <TextInput
            style={styles.input}
            placeholder={t('password')}
            secureTextEntry
            onChangeText={(text) => dispatch(setPassword(text))}
            value={password}
          />
          <Button
            title={t('submit')}
            onPress={handleSubmit}
            disabled={!isFormValid}
            color={!isFormValid ? "#ccc" : "#007BFF"}
          />
        </ScrollView>
  );
};

export default SignIn;

