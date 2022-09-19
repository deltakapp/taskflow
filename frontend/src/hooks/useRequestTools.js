/* This file consolidates boilerplate code for API requests. */
/* Essentially a parameter object in the form of a react hook */

import { useDispatch, useSelector } from "react-redux";
import { apiDomain } from "../utils/apiDomain";
import createRequest from "../utils/createRequest";
import handleApiError from "../utils/handleApiError";

export default function useRequestTools() {
  const dispatch = useDispatch();
  const PATH = `${apiDomain}/api`; // The path to the server API
  const token = useSelector((state) => state.token); // User auth token

  return [createRequest, dispatch, handleApiError, PATH, token];
}
