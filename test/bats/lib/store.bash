store_get() {
  VARIABLE=$(printf '%s\n' $1 | awk '{ print toupper($0) }')

  if [ ! -z "${!VARIABLE}" ]
  then
    echo ${!VARIABLE}
  else
    echo "$([[ ! -f ${BATS_TMPDIR}/lgpuitl.$1 ]] || (cat ${BATS_TMPDIR}/lgpuitl.$1))"
  fi
}

store_set() {
  echo $2 > ${BATS_TMPDIR}/lgpuitl.$1
}

store_rm() {
  rm -rf ${BATS_TMPDIR}/lgpuitl.$1
}
