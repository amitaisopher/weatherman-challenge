export function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}



/**
 * [calcIrridationDailyDelta description]
 * @param  {object[]} irradiationData - Raw information recieved from API
 * @param  {object[]} fieldNamse - Array of field names to extract and calculate daily diff for.
 * @return {object[]} An array with daily changes complared to preceding day without the the first item.
 */
export function calcIrridationDailyDelta(irradiationData, fieldNames) {
    const dailyDelta = []
    irradiationData.list?.forEach((data, index, array) => {
        const diff = {}
        if (index > 0) {
            fieldNames.forEach(fieldName => {
                diff[fieldName] = data['radiation'][fieldName] - array[index - 1]['radiation'][fieldName]
            })
            const currentDay = new Date(data?.dt * 1000)
            const prevDay = new Date(array[index - 1].dt * 1000)
            diff.name = `${prevDay.getDate()}/${(prevDay.getMonth() + 1)} => ${currentDay.getDate()}/${(currentDay.getMonth() + 1)}`
            dailyDelta.push(diff)
        }
    })
    return dailyDelta
}