import { useGetIngredientsQuery } from '@/services/api/burger-api';
import { constructorIngredientsSelector } from '@/services/burger-constructor/burger-constructor-slice';
import { useAppSelector } from '@/services/store';
import { getErrorMessage } from '@/utils/utils';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';

import { ErrorBlock } from '../error-block/error-block';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  const constructorIngredients = useAppSelector(constructorIngredientsSelector);

  const { data: ingredients = [], isLoading, error } = useGetIngredientsQuery();

  const errorResponse = getErrorMessage(error);

  return (
    <div className={styles.app}>
      <AppHeader />
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      <main className={`${styles.main} pl-5 pr-5`}>
        {!!error && <ErrorBlock message={errorResponse!} />}
        {isLoading && <Preloader />}
        {!error && !isLoading && (
          <>
            <BurgerIngredients ingredients={ingredients} />
            <BurgerConstructor ingredients={constructorIngredients} />
          </>
        )}
      </main>
    </div>
  );
};

export default App;
