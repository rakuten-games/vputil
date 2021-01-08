#!/usr/bin/env bats

load lib/store

@test "run game list" {
  run vputil game list -v

  echo -e "status: $status"
  echo -e "output:\n $output"

  [ "$status" -eq 0 ]
  [[ "$output" != *"Error"* ]]
}

@test "run game describe" {
  game_id="$(store_get game_id)"

  [ ! -z "$game_id" ]

  run vputil game describe ${game_id} -v

  echo -e "status: $status"
  echo -e "output:\n $output"

  [ "$status" -eq 0 ]
  [[ "$output" != *"Error"* ]]
}

@test "run game upload" {
  game_id="$(store_get game_id)"

  [ ! -z "$game_id" ]

  run vputil game upload $game_id ${BATS_TEST_DIRNAME}/asset/game.zip -v

  echo -e "status: $status"
  echo -e "output:\n $output"

  [ "$status" -eq 0 ]
  [[ "$output" != *"Error"* ]]

  version="$(echo $output | sed "s/.*Upload successfully to version \([0-9]*\)/\1/")"
  echo "version: $version"

  store_set version $version

  sleep 3
}

@test "run game deploy" {
  game_id="$(store_get game_id)"

  [ ! -z "$game_id" ]

  version="$(store_get version)"
  store_rm version

  [ ! -z "$version" ]

  echo -e "version: $version"

  run vputil game deploy $game_id $version

  echo -e "status: $status"
  echo -e "output:\n $output"

  [ "$status" -eq 0 ]
  [[ "$output" != *"Error"* ]]
}

