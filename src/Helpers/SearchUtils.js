export function applySearchFilters(data, search, filters) {
    search = search && typeof search === 'string' ? search.toLowerCase() : '';

    if (Object.values(filters).every((value) => value === false)) {
      return data;
    }
  
    data = filters.startDate
      ? data.filter((job) => new Date(job.starttime) >= new Date(filters.startDate))
      : data;
    data = filters.endDate
      ? data.filter((job) => new Date(job.endtime) <= extraDay(new Date(filters.endDate)))
      : data;
  
    return data.filter((job) => {
      const isIdMatch = filters.id === true && job.id.toString().indexOf(search) !== -1;
      const isContactMatch = filters.contact === true && job.contact.toLowerCase().indexOf(search) !== -1;
      const isWoMatch = filters.woNumber === true && job.wo_number.toString().toLowerCase().indexOf(search) !== -1;
      const isPoMatch = filters.poNumber === true && job.po_number.toString().toLowerCase().indexOf(search) !== -1;
      const isPermitNumberMatch = filters.permitNumber === true && job.permit_number?.toString().toLowerCase().indexOf(search) !== -1;
      const isRequestIDMatch = filters.requestID === true && job.request_id.toString().toLowerCase().indexOf(search) !== -1;
      const isSetupMatch = filters.setup === true && job.setup.toLowerCase().indexOf(search) !== -1;
      const isCompanyMatch = filters.company === true && job.company.toLowerCase().indexOf(search) !== -1;
      return (
        isIdMatch ||
        isSetupMatch ||
        isContactMatch ||
        isWoMatch ||
        isPoMatch ||
        isPermitNumberMatch ||
        isRequestIDMatch ||
        isCompanyMatch
      );
    });
  }
  
  function extraDay(date) {
    date.setDate(date.getDate() + 1);
    return date;
  }
  