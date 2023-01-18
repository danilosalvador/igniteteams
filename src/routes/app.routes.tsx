import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Groups } from '@screens/Groups';
import { NewGroup } from '@screens/NewGroup';
import { Players } from '@screens/Players';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
    const config = {
        animation: 'spring',
        config: {
          stiffness: 1000,
          damping: 500,
          mass: 3,
          overshootClamping: true,
          restDisplacementThreshold: 0.01,
          restSpeedThreshold: 0.01,
        },
      };

    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name="groups" component={Groups} />
            <Screen name="new" component={NewGroup} options={{ gestureDirection: 'vertical' }} />
            <Screen name="players" component={Players} />
        </Navigator>
    );
}
