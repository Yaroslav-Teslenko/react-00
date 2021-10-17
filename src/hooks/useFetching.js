import { useState } from "react";
/*
хук, который предоставляет часто используемый функционал, а именно
обработку индикации загрузки
и обработку ошибки запроса данных
при этом он возвращает нам массив, состоящий из трех элементов.
fetching, isLoading, error
*/
export const useFetching = (callback) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetching = async (...args) => {
    try {
      setIsLoading(true);
      await callback(...args);
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return [fetching, isLoading, error];
};
