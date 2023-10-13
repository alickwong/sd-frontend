import React, { useCallback } from 'react'
import { Button } from 'components/ui'
import appConfig from "../../../../configs/app.config";

const RunButtonActionColumn = ({ row }) => {
    function openInstance(row) {
      let url = `${appConfig.webuiBasePath}:${row.port}`;
      window.open(url, '_blank');
    }

    return (
        <div className="ltr:text-right rtl:text-left">
            <Button size="sm" onClick={() => openInstance(row)} >
               Run
            </Button>
        </div>
    )
}

export default RunButtonActionColumn
