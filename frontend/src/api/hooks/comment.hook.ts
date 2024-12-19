import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { CommentFormTypeCustom, IComment } from '@app/pages/productDetail/commentComponent/schemas';
import { filterType } from '@app/pages/productDetail/components/ProductComment';
import { CommentResultResponseType, ResultResponseType } from '@app/types/auth';
import { IErrorResponse } from '@app/types/common';

import {
  addComment,
  deleteMyComment,
  getCommentByProductId,
  getCommentImages,
  getMyComment,
  getRatingSummary
} from '../comment';

export const useAddComment = (): UseMutationResult<ResultResponseType, IErrorResponse, CommentFormTypeCustom> => {
  return useMutation({
    mutationFn: addComment
  });
};

export const useGetComments = (): UseMutationResult<
  CommentResultResponseType,
  IErrorResponse,
  { productId: string; page: number; pageSize: number; filter: filterType }
> => {
  return useMutation({
    mutationFn: getCommentByProductId
  });
};

export const useGetCommentImages = (): UseMutationResult<
  Omit<CommentResultResponseType, 'result'> & { result: string[] },
  IErrorResponse,
  { productId: string }
> => {
  return useMutation({
    mutationFn: getCommentImages
  });
};

export const useGetMyComment = (): UseMutationResult<
  Omit<CommentResultResponseType, 'result'> & { result: IComment },
  IErrorResponse,
  {
    productId: string;
  }
> => {
  return useMutation({
    mutationFn: getMyComment
  });
};

export const useDeleteMyComment = (): UseMutationResult<
  Omit<CommentResultResponseType, 'result'>,
  IErrorResponse,
  { productId: string }
> => {
  return useMutation({
    mutationFn: deleteMyComment
  });
};

export const useGetRatingSummary = (): UseMutationResult<
  Omit<CommentResultResponseType, 'result'> & {
    result: { star: number; count: number }[];
  },
  IErrorResponse,
  { productId: string }
> => {
  return useMutation({
    mutationFn: getRatingSummary
  });
};
