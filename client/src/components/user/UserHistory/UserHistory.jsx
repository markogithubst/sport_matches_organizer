import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { HistoryItem } from './HistoryItem';
import { httpGetUserHistory } from '../../../hooks/requests';
import { useToastify } from '../../../hooks/useToastify';

export const UserHistory = () => {
  const userId = localStorage.getItem('userid');
  const [history, setHistory] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await httpGetUserHistory(userId);
        console.log(data);
        setHistory(data);
      } catch (e) {
        useToastify(e);
      }
    };
    getData();

    return () => {
      // cleanup
    };
  }, []);

  return (
    <Container className=' rounded'>
      {history && history.map(item => {
        return <HistoryItem className="mt-5 shadow" key={item._id} item={item}></HistoryItem>;
      })}
    </Container>
  );
};
