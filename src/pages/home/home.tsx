import { BurgerConstructor } from '@/components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@/components/burger-ingredients/burger-ingredients';
import { ErrorBlock } from '@/components/error-block/error-block';
import { Page } from '@/components/page/page';
import { useGetIngredientsQuery } from '@/services/api/burger-api';
import { getErrorMessage } from '@/utils/utils';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import styles from './home.module.css';

export const Home = (): React.JSX.Element => {
  const { isLoading, error } = useGetIngredientsQuery();

  const errorResponse = getErrorMessage(error);

  return (
    <Page>
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      <main className={`${styles.main} pl-5 pr-5`}>
        {!!error && <ErrorBlock message={errorResponse!} />}
        {isLoading && <Preloader />}
        {!error && !isLoading && (
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        )}
      </main>
    </Page>
  );
};
