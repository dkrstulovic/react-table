import styled from "styled-components";

import { BORDER_GRAY_COLOR, WHITE_COLOR } from "../../colors";

export const TableContainer = styled.div`
  padding: 16px;
  table {
    width: 100%;
    border-spacing: 0;
    border-bottom: 1px solid ${BORDER_GRAY_COLOR};
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    thead {
      position: sticky;
      top: 0px;
      background: ${WHITE_COLOR};
      box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.08);
    }

    th {
      padding: 13px;
      padding-top: 77px;
      text-align: left;
      :first-child {
        width: 50%;
      }
    }

    td {
      text-align: left;
      padding: 16px;
      border-bottom: 1px solid ${BORDER_GRAY_COLOR};
      :first-letter {
        text-transform: uppercase;
      }
    }
  }
`;
