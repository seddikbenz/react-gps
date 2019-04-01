import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native-web";

import { colors } from "../constants";

export const Link = ({onPress, isSelected, text}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.link,
      {
        borderColor:
          isSelected
            ? colors.orange
            : colors.lightGray
      }
    ]}
  >
    <Text
      style={{
        fontWeight: isSelected ? "bold" : ""
      }}
    >
      {text}
    </Text>
  </TouchableOpacity>
)

const Links = withRouter(({ history, location, links }) => {
  if (links.lenght === 0) {
    return <></>;
  } else {
    return (
      <View style={styles.links}>
        {links.map((link, index) => {
          if(link.show){
            return (
              <TouchableOpacity
                key={index}
                onPress={() => history.push(link.url)}
                style={[
                  styles.link,
                  {
                    borderColor:
                      location.pathname === link.url
                        ? colors.orange
                        : colors.lightGray
                  }
                ]}
              >
                <Text
                  style={{
                    fontWeight: location.pathname === link.url ? "bold" : ""
                  }}
                >
                  {link.name}
                </Text>
              </TouchableOpacity>
            )
          }
        })}
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightGray,
    width: 800,
    flex: 1
  },
  links: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    backgroundColor: colors.gray,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  link: {
    height: 32,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: "center",
    marginRight: 10,
    backgroundColor: colors.lightGray
  }
});

Links.propTypes = {
  links: PropTypes.array.isRequired
};

export default withRouter(Links);
