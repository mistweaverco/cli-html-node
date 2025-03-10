import { HTMLNode, GlobalConfig, RenderResult } from '../../types';
import { renderTag } from '../utils/render-tag';
import { blockTag } from '../tag-helpers/block-tag';

interface Cell {
  value: string;
  width: number;
  rowSpan: number;
  colSpan: number;
}

interface Row {
  cells: Cell[];
  height: number;
}

const createCell = (node: HTMLNode, config: GlobalConfig): Cell => {
  const result = renderTag(node, config);
  const rowSpan = parseInt(node.attrs?.find(attr => attr.name === 'rowspan')?.value || '1', 10);
  const colSpan = parseInt(node.attrs?.find(attr => attr.name === 'colspan')?.value || '1', 10);

  const value = result?.value || '';

  return {
    value,
    width: Math.max(value.length, 3), // Minimum width of 3 for empty cells
    rowSpan: isNaN(rowSpan) ? 1 : rowSpan,
    colSpan: isNaN(colSpan) ? 1 : colSpan,
  };
};

const renderRow = (cells: Cell[], columnWidths: number[]): string => {
  if (cells.length === 0) return '';
  
  const cellValues = cells.map((cell, index) => {
    return cell.value.padEnd(columnWidths[index]);
  });

  return `| ${cellValues.join(' | ')} |`;
};

const renderSeparator = (columnWidths: number[]): string => {
  const separators = columnWidths.map(width => '-'.repeat(width));
  return `| ${separators.join(' | ')} |`;
};

const processTableStructure = (node: HTMLNode, config: GlobalConfig): Row[] => {
  const rows: Row[] = [];
  
  const processRow = (rowNode: HTMLNode) => {
    const cells = rowNode.childNodes
      ?.filter(child => child.nodeName === 'td' || child.nodeName === 'th')
      .map(cell => createCell(cell, config)) || [];
      
    const height = Math.max(...cells.map(cell => cell.value.split('\n').length));
    
    return { cells, height };
  };

  node.childNodes?.forEach(child => {
    if (child.nodeName === 'tr') {
      rows.push(processRow(child));
    } else if (child.nodeName === 'tbody' || child.nodeName === 'thead' || child.nodeName === 'tfoot') {
      child.childNodes?.forEach(row => {
        if (row.nodeName === 'tr') {
          rows.push(processRow(row));
        }
      });
    }
  });

  return rows;
};

const getColumnWidths = (rows: Row[]): number[] => {
  if (rows.length === 0) return [];
  
  const columnCount = Math.max(...rows.map(row => row.cells.length));
  const columnWidths = new Array(columnCount).fill(0);
  
  rows.forEach(row => {
    row.cells.forEach((cell, index) => {
      columnWidths[index] = Math.max(columnWidths[index], cell.value.length);
    });
  });
  
  return columnWidths;
};

export const table = (node: HTMLNode, config: GlobalConfig): RenderResult => {
  const rows = processTableStructure(node, config);
  if (rows.length === 0) return { value: '' };

  const columnWidths = getColumnWidths(rows);
  const tableRows = rows.map((row, index) => {
    const rowString = renderRow(row.cells, columnWidths);
    // Add separator after header row
    if (index === 0) {
      return rowString + '\n' + renderSeparator(columnWidths);
    }
    return rowString;
  });
  
  return {
    value: tableRows.join('\n'),
    width: config.width,
  };
};

export const caption = (node: HTMLNode, config: GlobalConfig): RenderResult => {
  const result = renderTag(node, config);
  return {
    value: result?.value || '',
    width: config.width,
  };
};

export const td = (node: HTMLNode, config: GlobalConfig): RenderResult => {
  const result = blockTag(node, config);
  return {
    value: result.value,
    width: result.width,
  };
};

export const th = (node: HTMLNode, config: GlobalConfig): RenderResult => {
  const result = blockTag(node, config);
  return {
    value: result.value,
    width: result.width,
  };
}; 