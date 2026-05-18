import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useRef, useState } from 'react';

import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { IngredientList } from '../ingredient-list/ingredient-list';
import { Modal } from '../modal/modal';
import { getFilteredIngredients } from './utils';

import type { TIngredient } from '@utils/types';

import styles from './burger-ingredients.module.css';

type TBurgerIngredientsProps = {
  ingredients: TIngredient[];
  selectedIngredientIds: string[];
  // onSelectIngredient: (id: string) => void;
};

export const BurgerIngredients = ({
  ingredients,
  selectedIngredientIds,
  // onSelectIngredient,
}: TBurgerIngredientsProps): React.JSX.Element => {
  const { buns, mains, sauces } = getFilteredIngredients(ingredients);

  const ingredientsBlockRef = useRef<HTMLDivElement>(null);
  const bunRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const sauceRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState<'bun' | 'main' | 'sauce'>('bun');
  const [selectedIngredient, setSelectedIngredient] = useState<TIngredient | null>(null);

  useEffect(() => {
    const block = ingredientsBlockRef.current;
    if (!block) return;

    const checkScrollPosition = (): void => {
      const scrollTop = block.scrollTop;
      const bunTop = bunRef.current?.offsetTop ?? 0;
      const mainTop = mainRef.current?.offsetTop ?? 0;
      const sauceTop = sauceRef.current?.offsetTop ?? 0;

      if (scrollTop < mainTop - bunTop) {
        setActiveTab('bun');
      } else if (scrollTop < sauceTop - bunTop) {
        setActiveTab('main');
      } else {
        setActiveTab('sauce');
      }
    };

    block.addEventListener('scroll', checkScrollPosition);
    checkScrollPosition();

    return (): void => block.removeEventListener('scroll', checkScrollPosition);
  }, [bunRef, mainRef, sauceRef]);

  const handleTabClick = (
    tab: 'bun' | 'main' | 'sauce',
    ref: React.RefObject<HTMLDivElement | null>
  ): void => {
    setActiveTab(tab);

    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const onSelectIngredient = (ingredient: TIngredient): void => {
    setSelectedIngredient(ingredient);
  };

  const handleCloseModal = (): void => {
    setSelectedIngredient(null);
  };

  return (
    <section className={styles.burger_ingredients}>
      <nav className="mb-10">
        <ul className={styles.menu}>
          <Tab
            value="bun"
            active={activeTab === 'bun'}
            onClick={() => handleTabClick('bun', bunRef)}
          >
            Булки
          </Tab>
          <Tab
            value="main"
            active={activeTab === 'main'}
            onClick={() => handleTabClick('main', mainRef)}
          >
            Начинки
          </Tab>
          <Tab
            value="sauce"
            active={activeTab === 'sauce'}
            onClick={() => handleTabClick('sauce', sauceRef)}
          >
            Соусы
          </Tab>
        </ul>
      </nav>
      <div
        ref={ingredientsBlockRef}
        className={`${styles.ingredients_block} pr-2 custom-scroll`}
      >
        <IngredientList
          ref={bunRef}
          title="Булки"
          ingredients={buns}
          onSelectIngredient={onSelectIngredient}
          selectedIngredientIds={selectedIngredientIds}
        />
        <IngredientList
          ref={mainRef}
          title="Начинки"
          ingredients={mains}
          onSelectIngredient={onSelectIngredient}
          selectedIngredientIds={selectedIngredientIds}
        />
        <IngredientList
          ref={sauceRef}
          title="Соусы"
          ingredients={sauces}
          onSelectIngredient={onSelectIngredient}
          selectedIngredientIds={selectedIngredientIds}
        />
      </div>

      {!!selectedIngredient && (
        <Modal onClose={handleCloseModal} title="Детали ингредиента">
          <IngredientDetails ingredient={selectedIngredient} />
        </Modal>
      )}
    </section>
  );
};
