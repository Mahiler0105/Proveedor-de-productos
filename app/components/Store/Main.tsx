import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
  RefreshControl,
  StatusBar,
} from "react-native";
import { Icon, Input, Button } from "react-native-elements";
import Layout from "../../../constants/Layout";
import { Locals, Store } from "./Store";
import Modal from "../Modal";
import Mapview from "./Mapview";
import { LatLng } from "react-native-maps";
import LoadingFull from "../../components/LoadingFull";

import Constants from "expo-constants";
const status = Constants.statusBarHeight;

import { firebaseApp } from "../../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

let width = Layout.window.width;
let height = Layout.window.height;
const color = "rgb(78,32,29)";

const locals: Locals = {
  ini: [{ id: 1, icon: "plus", type: "material-community" }],
  all: [],
};
const iconsavailable = [
  { icon: "home" },
  { icon: "drive-eta" },
  { icon: "headset" },
  { icon: "laptop" },
  { icon: "beach-access" },
  { icon: "cloud" },
  { icon: "favorite" },
  { icon: "free-breakfast" },
];

const Del = (props) => {
  const { ind, e, d, reload } = props;
  const [disabled, setDisabled] = useState(false);

  const [value, setValue, setReady] = reload;

  const user = db
    .collection("Vendedor")
    .doc(firebase.auth().currentUser.uid)
    .get();
  const deleteStore = async () => {
    e(false);
    d(false);
    setReady(false);
    await db
      .collection("Vendedor")
      .doc(firebase.auth().currentUser.uid)
      .update({
        tiendas: (await user).data().tiendas - 1,
      })
      .then(() => console.log("Actualizacion correcta"))
      .catch(() => console.log("Error al actualizar cantidad..."));

    await db
      .collection("Tienda")
      .doc(locals.all[ind].id)
      .delete()
      .then(() => console.log("Eliminado"))
      .catch(() => console.log("Error al eliminar Tienda..."));
    setValue(!value);
  };
  return (
    <>
      <View
        style={{
          height: 52,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Text style={{ fontSize: 24 }}>¿Desea eliminar esta tienda?</Text>
      </View>
      <View
        style={{
          height: 52,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Button
          disabled={disabled}
          buttonStyle={{ paddingLeft: 50, paddingRight: 50 }}
          title="Si"
          type="clear"
          onPress={() => {
            setDisabled(true);
            deleteStore();
          }}
        />
        <Button
          disabled={disabled}
          onPress={() => {
            d(false);
          }}
          buttonStyle={{ paddingLeft: 50, paddingRight: 50 }}
          title="No"
          type="clear"
        />
      </View>
    </>
  );
};
const Seticons = (props) => {
  const { setnum, num, ind, name } = props;
  let len = iconsavailable.length;
  return (
    <TouchableOpacity
      style={{ marginRight: (ind + 1) % len == 0 ? 0 : 5 }}
      onPress={() => {
        setnum(ind);
      }}
    >
      <View
        style={{
          zIndex: 99999,
          width: "100%",
          borderWidth: 2,
          borderColor: num == ind ? color : "rgba(189, 187, 178, 0.3)",
          padding: 5,
        }}
      >
        <Icon
          name={name}
          size={20}
          color={num == ind ? color : "rgba(189, 187, 178, 0.3)"}
        />
      </View>
    </TouchableOpacity>
  );
};
const Children = (props) => {
  const { ind, data, edit, e, m, viewall, coor, reload } = props;
  const [num, setNum] = useState(0);
  const [del, setDel] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [value, setValue, setReady] = reload;

  const [nombreLocal, setNombreLocal] = useState("");
  const [personaContacto, setPersonaContacto] = useState("");
  const [celular, setCelular] = useState("");
  const [direccion, setDireccion] = useState("");

  const newStore: Store = {
    id: firebase.auth().currentUser.uid,
    name: nombreLocal,
    cont: personaContacto,
    cell: celular,
    desc: direccion,
    icon: iconsavailable[num].icon,
    dire: { latitude: coor.latitude, longitude: coor.longitude },
  };
  const user = db
    .collection("Vendedor")
    .doc(firebase.auth().currentUser.uid)
    .get();
  const addStore = async () => {
    e(false);
    setReady(false);
    await db
      .collection("Vendedor")
      .doc(firebase.auth().currentUser.uid)
      .update({
        tiendas: (await user).data().tiendas + 1,
      })
      .then(() => console.log("Actualizacion correcta"))
      .catch(() => console.log("Error al actualizar cantidad..."));

    await db
      .collection("Tienda")
      .doc()
      .set({
        idpr: firebase.auth().currentUser.uid,
        name: newStore.name,
        cont: newStore.cont,
        cell: newStore.cell,
        desc: newStore.desc,
        icon: newStore.icon,
        lati: newStore.dire.latitude,
        long: newStore.dire.longitude,
        crat: new Date(),
      })
      .then(() => console.log("Agregado"))
      .catch(() => console.log("Error al añadir Tienda..."));
    setValue(!value);
  };
  const editStore = async () => {
    e(false);
    setReady(false);
    await db
      .collection("Tienda")
      .doc(locals.all[ind].id)
      .update({
        name: newStore.name,
        cont: newStore.cont,
        cell: newStore.cell,
        desc: newStore.desc,
        icon: newStore.icon,
        lati: newStore.dire.latitude,
        long: newStore.dire.longitude,
      })
      .then(() => console.log("Actualizado"))
      .catch(() => console.log("Error al añadir Tienda..."));
    setValue(!value);
  };

  return (
    <>
      <View
        style={{
          marginBottom: 5,
          height: 52,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Text style={{ fontSize: 24 }}>
          {edit ? "Editar tienda" : "Añadir nueva tienda"}
        </Text>
        {edit ? (
          <TouchableOpacity
            style={{ marginLeft: 25 }}
            onPress={() => {
              setDel(true);
            }}
          >
            <Icon
              color={color}
              size={25}
              name="trash-can"
              type={"material-community"}
            ></Icon>
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>

      <Input
        placeholder={edit ? data[ind].cont : "Nombre del local"}
        onChange={(e) => setNombreLocal(e.nativeEvent.text)}
        leftIcon={<Icon name="store" type="material" size={24} color={color} />}
        rightIcon={
          <Icon
            iconStyle={{ opacity: 0 }}
            name="error"
            type="material"
            size={24}
            color={"red"}
          />
        }
      ></Input>
      <Input
        placeholder={edit ? data[ind].cont : "Persona de contacto"}
        onChange={(e) => setPersonaContacto(e.nativeEvent.text)}
        leftIcon={
          <Icon name="person" type="material" size={24} color={color} />
        }
        rightIcon={
          <Icon
            iconStyle={{ opacity: 0 }}
            name="error"
            type="material"
            size={24}
            color={"red"}
          />
        }
      ></Input>
      <Input
        placeholder={edit ? data[ind].cell : "Celular"}
        onChange={(e) => setCelular(e.nativeEvent.text)}
        leftIcon={<Icon name="phone" type="material" size={24} color={color} />}
        rightIcon={
          <Icon
            iconStyle={{ opacity: 0 }}
            name="error"
            type="material"
            size={24}
            color={"red"}
          />
        }
      ></Input>
      <Input
        placeholder={edit ? data[ind].desc : "Direccion completa"}
        onChange={(e) => setDireccion(e.nativeEvent.text)}
        leftIcon={
          <Icon name="location-city" type="material" size={24} color={color} />
        }
        rightIcon={
          <Icon
            iconStyle={{ opacity: 0 }}
            name="error"
            type="material"
            size={24}
            color={"red"}
          />
        }
      ></Input>

      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <Icon name="add-location" type="material" size={24} color={color} />
        <Text style={{ fontSize: 15, fontWeight: "bold", marginRight: 10 }}>
          Mapa
        </Text>
        <TouchableOpacity
          onPress={() => {
            m(true);
            viewall(false);
          }}
        >
          <Text style={{ color: "#245c9c" }}>
            {coor.latitude == 0
              ? "Ubique en el mapa"
              : coor.latitude + "º " + coor.longitude + "º"}
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <Icon name="insert-emoticon" type="material" size={24} color={color} />
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          Icono para su tienda
        </Text>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <FlatList
          data={iconsavailable}
          horizontal
          keyExtractor={(item, index) => "key" + index}
          renderItem={({ item, index }) => (
            <Seticons
              ind={index}
              name={item.icon}
              num={num}
              setnum={setNum}
            ></Seticons>
          )}
          windowSize={10}
        />
      </View>
      <Button
        onPress={() => {
          setDisabled(true);
          edit ? editStore() : addStore();
        }}
        title="Guardar"
        type="clear"
        disabled={
          (nombreLocal &&
            personaContacto &&
            celular &&
            direccion &&
            coor.latitude != 0) ||
          disabled
            ? false
            : true
        }
      />

      <Modal
        isVisible={del}
        setIsVisible={setDel}
        children={<Del ind={ind} e={e} d={setDel} reload={reload} />}
        back={"#fff"}
      ></Modal>
    </>
  );
};
const Storefill = (props) => {
  const { s, e, v, c, ind, store } = props;
  return (
    <TouchableOpacity
      style={
        (ind + 1) % 2 == 0
          ? { marginBottom: 5, marginRight: 5 }
          : { marginBottom: 5, marginRight: 0 }
      }
      onPress={() => {
        v(true);
        e(true);
        s(ind);
        c(locals.all[ind].dire);
      }}
    >
      <View style={{ ...styles.store }}>
        <Icon color={color} size={100} name={store.icon}></Icon>
        <Text style={{ textAlign: "center", fontSize: 17, color: "black" }}>
          Tienda {ind + 1}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
const MainStore = (props) => {
  let cuser = firebase.auth().currentUser.uid;
  let nroTiendas = 0;
  const [ready, setReady] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const load = async () => {
      await db
        .collection("Vendedor")
        .doc(cuser)
        .get()
        .then((doc) => {
          nroTiendas = doc.data().tiendas;
          console.log(nroTiendas);
        })
        .catch(() => console.log("Error"));
      if (nroTiendas > 0) {
        loadStores();
      } else {
        locals.all = [];
        setReady(true);
      }
    };
    load();
    const loadStores = async () => {
      locals.all = [];
      await db
        .collection("Tienda")
        .where("idpr", "==", cuser)
        .orderBy("crat")
        .get()
        .then((response) => {
          let cant = response.docs.length;
          response.forEach((doc) => {
            const temp: Store = {
              id: doc.id,
              name: doc.data().name,
              cont: doc.data().cont,
              cell: doc.data().cell,
              desc: doc.data().desc,
              icon: doc.data().icon,
              dire: { latitude: doc.data().lati, longitude: doc.data().long },
            };
            locals.all.push(temp);
          });
        })
        .catch(() => console.log("Error"));
      setReady(true);
    };
  }, [reload]);

  const [visible, setVisible] = useState(false);
  const [edit, setEdit] = useState(false);
  const [map, setMap] = useState(false);
  const [view, setView] = useState(false);
  const [ind, setInd] = useState(0);
  const empty: LatLng = { latitude: 0, longitude: 0 };
  const [coordinates, setCoordinates] = useState(empty);
  const [direction, setDire] = useState("");

  if (!ready) {
    return (
      <View style={{ width: width, height: height }}>
        <LoadingFull isVisible={true} color={color} />
      </View>
    );
  } else {
    return (
      <SafeAreaView>
        <StatusBar barStyle={"light-content"} />
        <View style={styles.super}>
          <View style={styles.container}>
            <View
              style={{
                marginBottom: 5,
                height: 52,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 24 }}>Mis Tiendas</Text>
            </View>

            <TouchableOpacity
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                width: 32,
                height: 32,
                borderRadius: 16,
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => {
                setReload(!reload);
                setReady(false);
              }}
            >
              <Icon
                color={color}
                size={20}
                name={"reload1"}
                type={"antdesign"}
              ></Icon>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ marginRight: 5, marginBottom: 5, borderRadius: 20 }}
              onPress={() => {
                setVisible(true);
                setEdit(false);
                setCoordinates(empty);
              }}
            >
              <View style={{ ...styles.store, borderRadius: 20 }}>
                <Icon
                  color={color}
                  size={100}
                  name={locals.ini[0].icon}
                  type={locals.ini[0].type}
                ></Icon>
              </View>
            </TouchableOpacity>

            {locals.all.map((store, key) => (
              <Storefill
                key={key}
                ind={key}
                store={store}
                e={setEdit}
                v={setVisible}
                s={setInd}
                c={setCoordinates}
              />
            ))}
          </View>
          {locals.all.length > 1 ? (
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                marginTop: 10 /*marginBottom:10*/,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setMap(true);
                  setView(true);
                }}
              >
                <Icon name="location" type="entypo" size={24} color={color} />
                <Text style={{ color: "#245c9c" }}>
                  Ver mapa de mis tiendas
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <></>
          )}

          <Modal
            isVisible={visible}
            setIsVisible={setVisible}
            back={"#fff"}
            children={
              <Children
                ind={ind}
                data={locals.all}
                edit={edit}
                e={setVisible}
                m={setMap}
                viewall={setView}
                coor={coordinates}
                reload={[reload, setReload, setReady]}
              />
            }
          ></Modal>
          <Modal
            isVisible={map}
            setIsVisible={setMap}
            back={"#fff"}
            children={
              <Mapview
                all={view}
                color={color}
                places={locals.all}
                index={ind}
                title={"Ubicacion de mis tiendas"}
                hide={setMap}
                address={setDire}
                save={setCoordinates}
              />
            }
          ></Modal>
        </View>
      </SafeAreaView>
    );
  }
};
export default MainStore;

const styles = StyleSheet.create({
  super: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    padding: 10,
  },
  container: {
    marginLeft: 15,
    marginRight: 15,
    width: "100%",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  child: {
    flexDirection: "row",
    zIndex: 10000,
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  store: {
    borderColor: color,
    borderWidth: 2,
    width: (width - 25) / 2,
    height: (width - 25) / 2,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
