import React from 'react';
import { Table } from '@mantine/core';
import './Statistics.css';
interface WineData {
  [key: string]: number | string;
}

interface Result {
  Alcohol: string;
  Mean: string;
  Mode: string;
  Median: string;
}

interface StatisticsProps {
  wineData: WineData[];
  field: string;
}

const Statistics: React.FC<StatisticsProps> = ({ wineData, field }) => {
  const groupedData = wineData.reduce((acc, curr) => {
    const alcohol = curr.Alcohol;
    if (!acc[alcohol]) {
      acc[alcohol] = [];
    }
    acc[alcohol].push(curr[field]);
    return acc;
  }, {} as Record<string, (number | string)[]>);

  const results = Object.entries(groupedData).map(([alcohol, data]) => {
    const numericData = data.map((value) =>
      typeof value === 'string' ? parseFloat(value) : value
    );

    const sum = numericData.reduce((acc, curr) => acc + curr, 0);
    const mean = sum / data.length;

    const counts: Record<number | string, number> = {};
    numericData.forEach((value) => {
      counts[value] = (counts[value] || 0) + 1;
    });
    const mode = Object.keys(counts).reduce((a, b) =>
      counts[a] > counts[b] ? a : b
    );
    const modeRounded = parseFloat(mode.toString()).toFixed(2);

    const sortedData = [...numericData].sort((a, b) =>
      typeof a === 'number' && typeof b === 'number' ? a - b : 0
    );
    const middle = Math.floor(sortedData.length / 2);
    const median =
      sortedData.length % 2 === 0
        ? (parseFloat(sortedData[middle - 1].toString()) +
            parseFloat(sortedData[middle].toString())) /
          2
        : parseFloat(sortedData[middle].toString());

    return {
      Alcohol: alcohol,
      Mean: mean.toFixed(2),
      Mode: modeRounded,
      Median: median.toFixed(2),
    };
  });

  return (
    <Table className="statistics-table">
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Measure</Table.Th>
          {results.map((result) => (
            <Table.Th key={result.Alcohol}>Class {result.Alcohol}</Table.Th>
          ))}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        <Table.Tr>
          <Table.Td>{field} Mean</Table.Td>
          {results.map((result) => (
            <Table.Td key={result.Alcohol}>{result.Mean}</Table.Td>
          ))}
        </Table.Tr>
        <Table.Tr>
          <Table.Td>{field} Mode</Table.Td>
          {results.map((result) => (
            <Table.Td key={result.Alcohol}>{result.Mode}</Table.Td>
          ))}
        </Table.Tr>
        <Table.Tr>
          <Table.Td>{field} Median</Table.Td>
          {results.map((result) => (
            <Table.Td key={result.Alcohol}>{result.Median}</Table.Td>
          ))}
        </Table.Tr>
      </Table.Tbody>
    </Table>
  );
};

export default Statistics;
