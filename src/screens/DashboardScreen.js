import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Header } from "react-native-elements";

import { VictoryBar, VictoryPie, VictoryChart, VictoryTheme } from "victory-native";

import { colors } from "../style/theme";
const { primary_c, secondary_c, tertiary_c, error_c } = colors;

const DashboardScreen = () => {
  const data = [
    { quarter: 1, earnings: 13000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 19000 }
  ];

  return (
    <View style={styles.container}>
      <Header
        backgroundColor={primary_c}
        placement="center"
        centerComponent={{
          text: "Dashboard",
          style: { color: "#fff", fontSize: 20 },
        }}
      />
      <ScrollView>
        <VictoryChart width={400} theme={VictoryTheme.material}>
          <VictoryBar data={data} x="quarter" y="earnings" />
        </VictoryChart>
        <VictoryPie
            data={[
              { x: "Cats", y: 35 },
              { x: "Dogs", y: 40 },
              { x: "Birds", y: 55 }
            ]}
          />
      </ScrollView>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});
