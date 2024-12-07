import { View, ActivityIndicator, ViewStyle, StyleSheet } from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../constants";
interface LoaderProps {
  containerStyle?: ViewStyle;
}
export const Loader: React.FC<LoaderProps> = ({ containerStyle }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <ActivityIndicator color={"white"} size={"large"} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: "black",
    opacity: 0.5,
    zIndex: 999,
    elevation: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
