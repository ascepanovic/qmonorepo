import { useState, useEffect } from "react";

import { category } from "@/api";
import { CategoryT } from "@/types";

export const useCategories = () => {
  const [categories, setCategories] = useState<CategoryT[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await category.all();
        setCategories(res.data);
      } catch (e) {
        setHasError(true);
      }
      setIsLoading(false);
    };
    getCategories();
  }, []);

  return { categories, isLoading, hasError };
};
