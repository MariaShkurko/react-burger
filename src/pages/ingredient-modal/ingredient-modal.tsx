import { IngredientDetails } from '@/components/ingredient-details/ingredient-details';
import { Modal } from '@/components/modal/modal';
import { useGetIngredientsQuery } from '@/services/api/burger-api';
import { useNavigate, useParams } from 'react-router-dom';

export const IngredientModal = (): React.JSX.Element | null => {
  const { id } = useParams();

  const { data: ingredients = [] } = useGetIngredientsQuery();
  const ingredient = ingredients?.find((value) => value._id === id);

  const navigate = useNavigate();
  const handleCloseModal = (): void => {
    void navigate(-1);
  };

  if (!ingredient) return null;

  return (
    <Modal onClose={handleCloseModal} title="Детали ингредиента">
      <IngredientDetails ingredient={ingredient} />
    </Modal>
  );
};
