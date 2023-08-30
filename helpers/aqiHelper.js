import {
    CONDITION_ARRAY,
    GOOD_INDEX_MAX,
    GOOD_INDEX_MIN, HAZARDOUS_INDEX_MAX, HAZARDOUS_INDEX_MIN,
    MODERATE_INDEX_MAX,
    MODERATE_INDEX_MIN,
    Table, UNHEALTHY_FOR_SENSITIVE_PEOPLE_INDEX_MAX, UNHEALTHY_FOR_SENSITIVE_PEOPLE_INDEX_MIN, UNHEALTHY_INDEX_MAX,
    UNHEALTHY_INDEX_MIN, VERY_UNHEALTHY_INDEX_MAX, VERY_UNHEALTHY_INDEX_MIN
} from "../constants/aqiTable.js";
import {getRandomNumberFromRange} from "./GeneralHelper.js";

export const getRemarkMapFromAqi = (aqIndex) => {
    if (aqIndex >= GOOD_INDEX_MIN && aqIndex <= GOOD_INDEX_MAX)
        return Table.GOOD;
    else if (aqIndex >= MODERATE_INDEX_MIN && aqIndex <= MODERATE_INDEX_MAX) {
        return Table.MODERATE;
    }
    else if (aqIndex >= UNHEALTHY_FOR_SENSITIVE_PEOPLE_INDEX_MIN && aqIndex <= UNHEALTHY_FOR_SENSITIVE_PEOPLE_INDEX_MAX) {
        return Table.UNHEALTHY_FOR_SENSITIVE;
    }
    else if (aqIndex >= UNHEALTHY_INDEX_MIN && aqIndex <= UNHEALTHY_INDEX_MAX) {
        return Table.UNHEALTHY_FOR_SENSITIVE;
    }
    else if (aqIndex >= VERY_UNHEALTHY_INDEX_MIN && aqIndex <= VERY_UNHEALTHY_INDEX_MAX) {
        return Table.VERY_UNHEALTHY;
    }
    else if (aqIndex >= HAZARDOUS_INDEX_MIN && aqIndex <= HAZARDOUS_INDEX_MAX) {
        return Table.HAZARDOUS;
    }

    return null;
}

export const arrayContainsNonGoodAQIs = (aqiArray = []) => {
    let isTrue = false;
    aqiArray.forEach(aqi => {
        if (aqi > GOOD_INDEX_MAX) {
            isTrue = true;
        }
    })

    return isTrue;
}

export const arrayContainsAtLeastOneUnhealthyIndex = (aqiArray = []) => {
    let isTrue = false;
    aqiArray.forEach(aqi => {
        if (aqi > UNHEALTHY_INDEX_MIN) {
            isTrue = true;
        }
    })

    return isTrue;
}

export const getRandomConditionType = () => {
    // generated by chatGPT: randomize outcome based on condition type
    const outcomes = CONDITION_ARRAY;
    const weights = [1, 2, 1, 1, 1, 1]; // Adjust weights as desired, the higher the weight, the lesser the chance of getting picked

    // Calculate the total weight
    const totalWeight = weights.reduce((total, weight) => total + weight, 0);

    // Generate a random number between 0 and the total weight
    const randomValue = Math.random() * totalWeight;

    let cumulativeWeight = 0;

    // Select the outcome based on weights
    for (let i = 0; i < outcomes.length; i++) {
        cumulativeWeight += weights[i];
        if (randomValue <= cumulativeWeight) {
            return outcomes[i];
        }
    }
}


export const getRandomConditionTypeBeta = (condition) => {
    // tweet every condition immediately, for Good, limit the chance 1 in 3 occurrences
    if (condition !== Table.GOOD.condition) {
        return condition;
    } else {
        const zeroOrOne = getRandomNumberFromRange(0, 2);
        if (zeroOrOne === 1) {
            return condition;
        } else {
            return 'FALSE_CONDITION' // i.e it will force a retry
        }
    }
}