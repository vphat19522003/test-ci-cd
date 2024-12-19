import { Request, Response } from 'express';

import STATUS_CODE from '@app/constants/responseStatus';
import CommentService from '@app/services/comment.service';

export const addCommentController = async (req: Request, res: Response): Promise<Response> => {
  const result = await CommentService.addComment(req);

  return res.json({
    status: STATUS_CODE.OK,
    message: 'Comment added successfully',
    result
  });
};

export const getCommentsController = async (req: Request, res: Response): Promise<Response> => {
  const result = await CommentService.getComments(req);

  return res.json({
    status: STATUS_CODE.OK,
    message: 'Get comments successfully',
    result
  });
};

export const getImageCommentsController = async (req: Request, res: Response): Promise<Response> => {
  const result = await CommentService.getImageComments(req);

  return res.json({
    status: STATUS_CODE.OK,
    message: 'Get image comments successfully',
    result
  });
};

export const getMyCommentController = async (req: Request, res: Response): Promise<Response> => {
  const result = await CommentService.getMyComment(req);

  return res.json({
    status: STATUS_CODE.OK,
    message: 'Get my comment successfully',
    result
  });
};

export const deleteMyCommentController = async (req: Request, res: Response): Promise<Response> => {
  await CommentService.deleteMyComment(req);

  return res.json({
    status: STATUS_CODE.OK,
    message: 'Delete comment successfully'
  });
};

export const getRatingSummaryController = async (req: Request, res: Response): Promise<Response> => {
  const result = await CommentService.getRatingSummary(req);

  return res.json({
    status: STATUS_CODE.OK,
    message: 'Get rating summary successfully',
    result
  });
};
