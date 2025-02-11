import CategoriesService from "@/services/CategoriesService";
import {
  createContext,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface CategoryContextType {
  categories: any;
  isLoadingCategories: boolean;
  reload: () => Promise<void>;
  // deleteCategory:(id:number)=> Promise<void>
}

export const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined
);

interface CategoryProviderProps {
  children: ReactNode;
}

export default function CategoryProvider({ children }: CategoryProviderProps) {
  const [categories, setCategories] = useState<[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  const loadCategories = useCallback(async () => {
    try {
      setIsLoadingCategories(true);
      const categoriesList = await CategoriesService.listCategories();
      setCategories(categoriesList);

      setIsLoadingCategories(false);
    } catch (error) {
      console.log("Erro loadCategories", error);
    } finally {
      setIsLoadingCategories(false);
    }
  }, []);
  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return (
    <CategoryContext.Provider
      value={{ categories, isLoadingCategories, reload: loadCategories }}
    >
      {children}
    </CategoryContext.Provider>
  );
}
