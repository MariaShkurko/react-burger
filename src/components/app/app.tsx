import { IngredientApi } from '@/api/ingredient-api';
import { HttpClient } from '@/utils/httpClient';
import { HOST_API } from '@/utils/URLs';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';

import { ErrorBlock } from '../error-block/error-block';

import type { TIngredient } from '@/utils/types';

import styles from './app.module.css';

const httpClient = new HttpClient({
  baseUrl: HOST_API,
});
const ingredientAPI = new IngredientApi(httpClient);

export const App = (): React.JSX.Element => {
  const [ingredients, setIngredients] = useState<TIngredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIngredientIds, setSelectedIngredientIds] = useState<string[]>([
    '692889f16bf770001bfeb4cc',
    '692889f16bf770001bfeb4d7',
    '692889f16bf770001bfeb4da',
    '692889f16bf770001bfeb4cf',
  ]);

  useEffect(() => {
    ingredientAPI
      .getIngredients()
      .then((response) => {
        if ('status' in response) {
          throw new Error(response.message ?? 'Неизвестная ошибка');
        }
        setIngredients(response);
      })
      .catch((err) => {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Произошла неизвестная ошибка');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // const onSelectIngredient = (id: string): void => {
  //   setSelectedIngredientIds((prev) => {
  //     if (prev.includes(id)) {
  //       return prev.filter((item) => item !== id);
  //     }
  //     return [...prev, id];
  //   });
  // };
  const onDeleteIngredient = (id: string): void => {
    setSelectedIngredientIds((prev) => prev.filter((item) => item !== id));
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      <main className={`${styles.main} pl-5 pr-5`}>
        {!!error && <ErrorBlock message={error} />}
        {loading && <Preloader />}
        {!error && !loading && (
          <>
            <BurgerIngredients
              ingredients={ingredients}
              selectedIngredientIds={selectedIngredientIds}
            />
            <BurgerConstructor
              ingredients={ingredients}
              selectedIngredientIds={selectedIngredientIds}
              onDeleteIngredient={onDeleteIngredient}
            />
          </>
        )}
      </main>
    </div>
  );
};

export default App;
