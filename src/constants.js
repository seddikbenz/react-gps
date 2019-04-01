import { StyleSheet } from "react-native-web";

export const colors = {
  gray: "#D1D1D1",
  lightGray: "#E9EBEE",
  darkGray: "gray",
  orange: "#FF9900",
  red: "#E91E63",
  blue: "#2196F3",
  darkBlue: "#607d8b"
};

export const globalStyles = StyleSheet.create({
  textInput: {
    paddingHorizontal: 10,
    height: 32,
    width: 320,
    fontSize: 16,
    backgroundColor: "white",
    borderRadius: 3
  },
  pickerInput: {
    paddingHorizontal: 10,
    height: 32,
    width: 320,
    backgroundColor: "white",
    borderRadius: 3
  },
  container: {
    backgroundColor: colors.gray,
    flex: 1,
    margin: 10
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 48,
    backgroundColor: colors.gray,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "white"
  },
  searchInput: {
    paddingHorizontal: 10,
    height: 32,
    width: 290,
    fontSize: 16,
    backgroundColor: "white",
    borderRadius: 3
  },
  cards: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 5
  },
  card: {
    alignItems: "center",
    width: 226,
    borderWidth: 1,
    borderRadius: 5,
    margin: 3,
    backgroundColor: colors.lightGray,
    justifyContent: "space-between"
  },
  cardButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    bottom: 0,
    paddingBottom: 3
  },
  cardButton: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center"
  },
  cardBody: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    marginBottom: 3,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray
  },
  links: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    backgroundColor: colors.gray,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
});
