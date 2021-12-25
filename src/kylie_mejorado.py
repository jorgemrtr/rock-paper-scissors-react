import math
import random


def play():
    # available choices
    choices = ['r', 'p', 's']

    # user and computer pick a choice
    user = pick_choice(choices)
    computer = random.choice(choices)

    # check the result of the game
    result = check_result(user, computer)
    return result, user, computer


def is_win(player, opponent):
    # return true is the player beats the opponent
    # winning conditions: r > s, s > p, p > r
    if (player == 'r' and opponent == 's') or (player == 's' and opponent == 'p') or (
            player == 'p' and opponent == 'r'):
        return True
    return False


def pick_choice(choices):
    user = None

    while user not in choices:
        user = input("What's your choice? 'r' for rock, 'p' for paper, 's' for scissor\n")
        user = user.lower()
    return user


def check_result(user, computer):
    if user == computer:
        return 0
    elif is_win(user, computer):
        return 1
    else:
        return -1


def play_best_of(n):
    # play against the computer until someone wins best of n games
    # to win, you must win ceil(n/2) games (ie 2/3, 3/5, 4/7)
    player_wins = 0
    computer_wins = 0
    wins_necessary = math.ceil(n / 2)
    while player_wins < wins_necessary and computer_wins < wins_necessary:
        result, user, computer = play()
        # tie
        if result == 0:
            print("You and the computer have both chosen {}. It's a tie.".format(computer))
        # you win
        elif result == 1:
            player_wins += 1
            print("You have chosen {} and the computer has chosen {}. You won!".format(user, computer))
        # you lose
        else:
            computer_wins += 1
            print("You have chosen {} and the computer has chosen {}. You lost! :(".format(user, computer))
        print('\n')

    if player_wins > computer_wins:
        print('You have won the best of {} games! What a champ :D'.format(n))
    else:
        print('Unlucky, the computer has won the best of {} games. Better luck next time!'.format(n))


if __name__ == '__main__':
    play_best_of(3)
