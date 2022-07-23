# How to Contribute

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a code of conduct, please follow it in all your interactions with the project.

## Filing issues

Filing issues is an important way you can contribute to the Versum CLI.

### Bugs

If your issue is a bug, open one
[here](https://github.com/versumstudios/cli/issues/new?assignees=&labels=&template=bug_report.md&title=).
Follow the instructions on our bug report template.

### Feature Requests

If your issue is a feature request, open one [here](https://github.com/versumstudios/cli/issues/new?assignees=&labels=&template=feature_request.md&title=).
Follow the instructions on our feature request template.

## Contributing Code

We try to follow the [git flow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) development model.
Which means that we have a develop branch and main branch. All development is done under feature branches,
which are (when finished) merged into the development branch. When a new version is released we merge the develop branch into the master branch.

If your change is minor, please feel free to submit a [pull request](https://github.com/versumstudios/cli/pulls).
If your change is larger, or adds a feature, please file an issue beforehand so that we can discuss the change.
You're welcome to file an implementation pull request immediately as well, although we generally lean towards discussing the
change and then reviewing the implementation separately.

### Conventional commits

All commits should ideally follow the [conventional commits spec](https://www.conventionalcommits.org/en/v1.0.0/).

The most important prefixes you should have in mind are:

- `fix:` which represents bug fixes, and correlates to a SemVer patch.
- `feat:` which represents a new feature, and correlates to a SemVer minor.
- `feat!:`, or `fix!:`, `refactor!:`, etc., which represent a breaking change (indicated by the !) and will result in a SemVer major.

### Finding something to work on

If you want to write some code, but don't know where to start or what you might
want to do, take a look at the [Good First Issue] label on our [issues](https://github.com/versumstudios/cli/issues) page.

If you need help before you can start work, you can comment on the issue, and we
will try to help as best we can.

[good first issue]: https://github.com/versumstudios/cli/labels/good%20first%20issue

### Code Standards

We recommend you install ESLint and Prettier on your IDE.

## Code review

All submissions, including submissions by project members, require review. It is almost never the case that a pull request is accepted without some changes requested, so please do not be offended!

When you have finished making requested changes to your pull request, please make a comment containing "PTAL" (Please Take Another Look) on your pull request. GitHub notifications can be noisy, and it is unfortunately easy for things to be lost in the shuffle.

Once your PR is approved (hooray!), the reviewer will squash your commits into a single commit and then merge the commit onto the develop branch. Thank you!

## Github code review workflow conventions

(For project members and frequent contributors.)

As a contributor:

- Try hard to make each Pull Request as small and focused as possible. In
  particular, this means that if a reviewer asks you to do something that is
  beyond the scope of the Pull Request, the best practice is to file another
  issue and reference it from the Pull Request rather than just adding more
  commits to the existing PR.
- Adding someone as a Reviewer means "please feel free to look and comment";
  the review is optional. Choose as many Reviewers as you'd like.
- Adding someone as an Assignee means that the Pull Request should not be
  submitted until they approve. If you choose multiple Assignees, wait until
  all of them approve. It is fine to ask someone if they are OK with being
  removed as an Assignee.
- Make as many commits as you want locally, but try not to push them to Github
  until you've addressed comments; this allows the email notification about
  the push to be a signal to reviewers that the PR is ready to be looked at
  again.
- When there may be confusion about what should happen next for a PR, be
  explicit; add a "PTAL" comment if it is ready for review again, or a "Please
  hold off on reviewing for now" if you are still working on addressing
  comments.
- "Resolve" comments that you are sure you've addressed; let your reviewers
  resolve ones that you're not sure about.
- Do not use `git push --force`; this can cause comments from your reviewers
  that are associated with a specific commit to be lost. This implies that
  once you've sent a Pull Request, you should use `git merge` instead of `git rebase` to incorporate commits from the master branch.

As a reviewer:

- Be timely in your review process, especially if you are an Assignee.
- Try to use `Start a Review` instead of single comments, to reduce email
  spam.
- "Resolve" your own comments if they have been addressed.
- If you want your review to be blocking, and are not currently an Assignee,
  add yourself as an Assignee.

When squashing-and-merging:

- Ensure that **all** of the Assignees have approved.
- Do a final review of the one-line PR summary, ensuring that it meets the
  guidelines (e.g., "blob: add more blobbing") and accurately describes the
  change.
- Mark breaking changes with `BREAKING_CHANGE` in the commit message (e.g.,
  "blob: BREAKING_CHANGE remove old blob").
  - If the PR includes a breaking change, it will be declared via a commit
    with `BREAKING_CHANGE_OK` in it (see Contributor section above).
  - You can omit the marker if the change is technically breaking, but not
    expected to affect users (e.g., it's a breaking change to an object that
    wasn't in the last tagged release, or it's a change to a portable API
    function that's only expected to be used by driver implementations).
- Delete the automatically added commit lines; these are generally not
  interesting and make commit history harder to read.
