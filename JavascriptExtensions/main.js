const colors = {
  blue: "#FF60A5FA",
  green: "#FF86EFAC",
  red: "#FFFCA5A5",
  purple: "#FFA78BFA",
  gray50: "#FFf8fafc",
  grey100: "#FFf1f5f9",
  grey200: "#FFe2e8f0",
  grey300: "#FFcbd5e1",
  grey400: "#FF94a3b8",
  grey500: "#FF64748b",
  grey600: "#FF475569",
  grey700: "#FF334155",
  grey800: "#FF1e293b",
  grey900: "#FF0f172a",
  grey950: "#FF020617"
}

const carLabels = {
  TC1: {
    cadillacvseriesrgtp: "GAIN"
  },
  TC2: {
    cadillacvseriesrgtp: "SLIP"
  }
}

function getCarLabel(labelName) {
  if (carLabels.hasOwnProperty(labelName)) {
    const labelObj = carLabels[labelName];

    if (labelObj.hasOwnProperty($prop('CarId'))) {
      return labelObj[$prop('CarId')];
    }
  }

  return labelName;
}

/* ---- Positioning ---- */
function getTextSuffixLeftPos(value, baseLength, basePos, multiplier) {
  let diff = (value.toString().length * multiplier) - baseLength;
  return basePos + diff;
}

/* ---- Laptime ---- */
function getDeltaColor(value) {
  return value > 0
    ? colors.red
    : colors.green;
}

function getFourDigitDecimal(value) {
  if (value < 10 && -10 < value) {
    return value.toFixed(3);
  }
  else if (value < 100 && -100 < value) {
    return value.toFixed(2);
  }
  else if (value < 1000 && -1000 < value) {
    return value.toFixed(1);
  }
  else {
    return value.toFixed(0);
  }
}

// Deprecated
function getDecimalPoints(value, numOfDecimals) {
  return extractDecimalPart(value, numOfDecimals);
}

function extractDecimalPart(value, numOfDecimals) {
  const parts = String(value).split('.');
  const decimalPart = parts[1] || '';
  return decimalPart.substring(0, numOfDecimals).padEnd(numOfDecimals, '0');
}

function getSessionTime() {
  return $prop('GameRawData.SessionData.SessionInfo.Sessions01.IsLimitedTime') 
  ? $prop('SessionTimeLeft') 
  : secondstotimespan($prop('GameRawData.Telemetry.SessionTime'))
}

/* ---- Deployment ---- */
const deployModes = ["NDPY", "QUAL", "ATCK", "BAL", "BLD"];

function getDeployMode() {
  var deployIdx = +$prop('GameRawData.Telemetry.dcMGUKDeployMode');
  return deployModes[deployIdx];
}